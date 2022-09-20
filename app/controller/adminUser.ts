import BaseController from "../core/base_controller";
import * as moment from "moment";
import {SafeAdminUser} from "../class";

class AdminUserController extends BaseController {

  pwd = {
    type: "string", required: true, allowEmpty: false
  }
  userAccount = {
    account: {type: "string", required: true, allowEmpty: false, format: /[A-Za-z]$/},
    pwd: {...this.pwd}
  }

  // 查询是否已有注册管理用户
  async queryHasAdmin() {
    const {app, service} = this;
    try {
      let result = false;
      // @ts-ignore
      const has = await app.redis.get("def").get(app.config.HASADMINUSER);
      if (!has) {
        const count = await service.adminUser.checkHasAdminUserService();
        result = count > 0;
        if (result) {
          // @ts-ignore
          await app.redis.get("def").set(app.config.HASADMINUSER, "true");
        }
      } else {
        result = true;
      }
      this.success({
        status: 200,
        success: true,
        data: result
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 管理用户注册
  async sign() {
    const {ctx, service, app} = this;
    try {
      const data = ctx.request.body || {};
      // 校验参数
      const check = await this.validate({
        ...this.userAccount,
      });
      if (!check) return;
      // 第一次注册的为超级管理员用户
      const allRoles = await ctx.model.Role.findOne({where: {code: "superAdministrator"}});
      if (!allRoles) {
        this.success({
          success: false,
          errorMessage: "数据库初始化失败，请联系管理员！",
          status: 200
        })
        return
      }
      const obj = {
        ...data,
        nickName: data.account,
        roleId: allRoles.dataValues.id,
        enable: 1,
        isDelete: 0,
        createTime: moment().unix(),
        updateTime: moment().unix(),
      }
      const res = await service.adminUser.signService(obj);
      if (res.length === 2 && !res[1]) {
        this.success({
          status: 200,
          success: false,
          data: new SafeAdminUser(res[0]),
          errorMessage: "已创建同名用户"
        })
        return
      }
      // @ts-ignore
      await app.redis.get("def").set(app.config.HASADMINUSER, "true")
      this.success({
        status: 201,
        success: true,
        data: new SafeAdminUser(res[0])
      })
    } catch (e) {
      this.log(e)
    }
  }


}

export default AdminUserController;
