import {Service} from "egg";
import * as moment from "moment";
import {Op} from "sequelize";
import {CardType} from "../../typings/custom";

class CardService extends Service{

  // 检测会员卡Code是否存在
  checkCodeRepeat(code: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const {ctx} = this;
        const find = await ctx.model.Card.findOne({
          where: {
            code: {
              [Op.eq]: code
            },
          },
        });
        resolve(!!find)
      } catch (e) {
        reject(e)
      }
    })
  }

  // 创建会员卡
  async createService(data: CardType.Item) {
    const {ctx} = this;
    return await ctx.model.Card.create(data);
  }

  // 逻辑删除会员卡
  async deleteService(id: number | string) {
    const {ctx} = this;
    return await ctx.model.Card.update({isDelete: 1, updateTime: moment().unix()}, {where: {id}})
  }

  // 更新会员卡
  async updateService(id, data: CardType.Item & {id?: string | number}) {
    const {ctx} = this;
    delete data["id"];
    return await ctx.model.Card.update(data, {where: {id}})
  }

  // 高级分页查询会员卡
  async queryService(params: CardType.QueryParams) {
    const {ctx} = this;
    const {pageSize, page} = params;
    return await ctx.model.Card.findAndCountAll({
      where: {
        isDelete: 0,
        ...ctx.helper.transOpParams(params, {
          name: {condition: "like"},
          updateTime: {condition: "gte", isTime: true, isUnixTime: true},
          createTime: {condition: "gte", isTime: true, isUnixTime: true},
        }),
      },
      ...ctx.helper.computePage(page, pageSize),
      distinct: true,
      order: [
        ["createTime", "DESC"]
      ],
    })
  }

  // 查询全部会员卡
  async queryAllService() {
    const {ctx} = this;
    return await ctx.model.Card.findAndCountAll({
      where: {
        isDelete: 0,
      }
    })
  }

  // 查询会员卡第一条
  async queryFirstDataService(): Promise<number | null> {
    const {ctx} = this;
    const allList = await ctx.model.Card.findAll();
    return allList.length > 0 ? allList[0].id : null;
  }
}

export default CardService;
