import {Service} from "egg";

class AdminUserSerVice extends Service {
  // 用户注册
  public async signService(data) {
    const {ctx} = this;
    return await ctx.model.AdminUser.findOrCreate({defaults: data, where: {account: data.account}})
  }

  // 检测是否已有管理用户
  public async checkHasAdminUserService() {
    const {ctx} = this;
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
