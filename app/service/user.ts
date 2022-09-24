import {
  GetUserRiskRankResult,
  LoginServiceResult, User,
  WxLoginParseResult,
  WXLoginReqParams,
} from '../../typings/custom';
import * as moment from "moment";
import {SafeUser, WXUserRiskLevel} from "../class";
import {CryptoJSModel, guid, isNullOrEmpty} from "../utils";
import BaseService from "../core/base_service";
import { col, Op } from 'sequelize';

const CryptoJS = require("crypto-js");

export default class UserService extends BaseService {

  // 用户信息生成Token
  createTokenByUser(user) {
    const {app} = this;
    // jwt加签token
    const {jwt: {secret, sign: {expiresIn}}} = app.config;
    const token = app.jwt.sign({
      ...user
    }, secret, {expiresIn});
    return {
      ...user,
      token: token,
      expirationTime: moment().add(7200, "s").unix(),
      success: true,
    }
  }

  // 如果用户需要再次验证，就返回一个key，做验证流程使用
  initKey(user: WxLoginParseResult): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const {app} = this;
      try {
        const key = CryptoJS.HmacSHA3(
          JSON.stringify({
            t: moment().unix(),
            k: user.data?.openId || moment().valueOf()
          }),
          guid(),
        ).toString();
        const redisKey = app.config.verifyKey(key);
        // @ts-ignore
        await app.redis.get("def").set(redisKey, JSON.stringify(user || {}));
        resolve(redisKey)
      } catch (e) {
        reject(e)
      }
    })
  }

  // 微信用户登录
  async loginService(data: WXLoginReqParams): Promise<LoginServiceResult & SafeUser & GetUserRiskRankResult & {msg?: string}> {
    const {service, ctx} = this;
    const userInfo: WxLoginParseResult = await service.wxApi.login(data);
    if (!userInfo.success) {
      const checkRisk = await service.wxApi.getUserRiskRank(ctx.request.ip, userInfo.data?.openId);
      const temp = {
        ...checkRisk,
        token: "",
        expirationTime: -1,
        success: checkRisk.level === WXUserRiskLevel.lev0,
        ...(new SafeUser())
      };
      // 如果用户需要再次验证，就生成一个验证流程Key
      if (checkRisk.verifyAgain) {
        const flowKey = await this.initKey(userInfo);
        Object.assign(temp, {flowKey});
      }
      return temp
    }
    const find = await ctx.model.User.findOne({where: {openId: userInfo.data?.openId}});
    if (find) {
      const safeUser = new SafeUser(find);
      await this.updateService({
        loginTime: moment().unix(),
        id: find.id
      })
      return this.createTokenByUser(safeUser)
    } else {
      return await this.createNewUser(userInfo)
    }
  }

  // 创建用户
  createNewUser(userInfo: WxLoginParseResult):Promise<SafeUser & any> {
    return new Promise(async (resolve, reject) => {
      const {service, ctx} = this;
      try {
        const maxData = await service.sundry.getMax();
        const firstCardID = await service.card.queryFirstDataService();
        if (isNullOrEmpty(firstCardID)) {
          resolve({
            success: false,
            IDCard: "",
            avatar: "",
            bindWX: 0,
            cardTypeID: "",
            city: "",
            country: "",
            expirationTime: -1,
            gender: undefined,
            id: -1,
            level: -1,
            nickName: "",
            province: "",
            refuse: false,
            tel: "",
            token: "",
            verifyAgain: false,
            msg: "没有创建会员卡类型"
          })
        }
        const created = await ctx.model.User.create({
          nickName: userInfo.data?.nickName,
          avatar: userInfo.data?.avatarUrl,
          openId: userInfo.data?.openId,
          createTime: moment().unix(),
          balance: 0,
          IDCard: maxData && maxData.maxID ? maxData.maxID : "10000001",
          cardTypeID: firstCardID,
          bindWX: 1,
          loginTime: moment().unix(),
        });
        await service.sundry.updateMax(maxData && maxData.maxID ? maxData.maxID : "10000001");
        const safeUser = new SafeUser(created);
        resolve(this.createTokenByUser(safeUser))
      } catch (e) {
        reject(e)
      }
    })
  }

  // 更新用户信息
  async updateService(data: {[key: string]: any}) {
    const {ctx} = this;
    const fields = Object.keys(data);
    const idx = fields.findIndex(v => v === "id");
    if (idx > -1) {
      fields.splice(idx, 1)
    }
    await ctx.model.User.update(data, {
      where: {id: data.id},
      fields: fields
    });
    const newUser = await this.getUserService(data.id);
    return new SafeUser(newUser)
  }

  // 查询当前用户信息
  async getUserService(id: number) {
    if (!id) {
      return null
    }
    const {ctx, app} = this;
    return await ctx.model.User.findOne({
      where: {id},
      include: [
        {
          model: app.model.Card,
        }
      ],
    })
  }

  // 根据wx用户openID查询当前用户
  async getUserByOpenID(openID: string) {
    const {ctx} = this;
    return await ctx.model.User.findOne({
      where: {openId: openID},
    })
  }

  // 分页查询会员列表
  async queryUserList(data: User.QueryParams) {
    const {ctx, app} = this;
    const crypto = new CryptoJSModel(app.config.PHONEKEY);
    const query = await ctx.model.User.findAndCountAll({
      include: [
        {
          model: app.model.Card,
          attributes: [],
          required: true
        }
      ],
      attributes: {
        exclude: ["openId"],
        include: [
          [col("Card.id"), "cardId"],
          [col("Card.code"), "cardCode"],
          [col("Card.name"), "cardName"],
        ]
      },
      ...ctx.helper.computePage(data.page, data.pageSize),
      distinct: true,
      order: [
        ["createTime", "DESC"]
      ],
    })
    query.rows = query.rows.map(v => {
      return {
        ...v.dataValues,
        tel: v.dataValues.tel ? crypto.encrypt(v.dataValues.tel) : ""
      }
    })
    return query
  }

  // 会员卡或手机号查询指定用户
  async queryByKeyword(keyword: string) {
    const {ctx} = this;
    return await ctx.model.User.findAll({
      where: {
        [Op.or]: {
          tel: {
            [Op.like]: `%${keyword}%`
          },
          IDCard: {
            [Op.like]: `%${keyword}%`
          }
        }
      }
    })
  }

  // 会员卡或手机号查询指定用户
  async queryUserById(id: string) {
    const {ctx, app} = this;
    return await ctx.model.User.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: app.model.Card,
          attributes: [],
          required: true
        }
      ],
      attributes: {
        exclude: ["openId"],
        include: [
          [col("Card.id"), "cardId"],
          [col("Card.code"), "cardCode"],
          [col("Card.name"), "cardName"],
        ]
      },
    })
  }
}
