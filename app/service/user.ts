import {User,} from '../../typings/custom';
import {col} from 'sequelize';
import {Service} from "egg";

export default class UserService extends Service {

  // 分页查询会员列表
  // @ts-ignore
  async queryUserList(data: User.QueryParams) {
    const {ctx, app} = this;
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
      distinct: true,
      order: [
        ["createTime", "DESC"]
      ],
    })
    return query
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
