import {Service} from "egg";

class AdminUserSerVice extends Service {
  // 用户注册
  public async signService(data) {
    const {ctx} = this;
    // todo 这个model.AdminUser能够正常使用
    return await ctx.model.AdminUser.findOrCreate({defaults: data, where: {account: data.account}})
  }

  // 检测是否已有管理用户
  public async checkHasAdminUserService() {
    const {ctx, app} = this;
    ctx.logger.error("检测拥有admin账户失败---this1111：", ctx.model, app.model, app.model.AdminUser)
    // todo 这个model.AdminUser不存在，上面app.model.AdminUser或ctx.model.AdminUser都为null
    const res = await ctx.model.AdminUser.findAll({
      where: {
        isDelete: 0,
        enable: 1
      }
    });
    return res.length
  }


}

export default AdminUserSerVice;
