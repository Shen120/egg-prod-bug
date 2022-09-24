import BaseController from "../core/base_controller";
import {SafeUser} from "../class";
import {CryptoJSModel} from "../utils";

export default class UserController extends BaseController {

  // 微信code2Session授权
  async wxLogin() {
    const {ctx, service} = this;
    try {
      const params = ctx.request.body || {};
      const vali = await this.validate({
        code: "string",
        encryptedData: "string",
        iv: "string",
        signature: "string",
        rawData: "string",
      });
      if (!vali) return;
      console.log("提交的CODE：", params)
      const res = await service.user.loginService(params);
      console.log("第一次返回Token：", res)
      this.success({
        success: res.success,
        status: 200,
        data: res,
        errorMessage: res.msg
      })
    } catch (e) {
      console.log(222, e)
      this.log(e)
    }
  }

  // 获取用户信息
  async index() {
    const {service} = this;
    try {
      const wxUser = this.wxUser;
      const res = await service.user.getUserService(wxUser.id);
      this.success({
        success: true,
        status: 200,
        data: new SafeUser(res)
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 更新用户信息
  async update() {
    const {ctx, service} = this;
    try {
      const params = ctx.request.body;
      const res = await service.user.updateService({...params, id: this.wxUser.id});
      this.success({
        status: 200,
        success: true,
        data: res
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 获取用户手机号
  async getPhone() {
    const {ctx, service} = this;
    try {
      const params = ctx.request.body;
      const vali = await this.validate({
        code: "string",
        iv: "string"
      });
      if (!vali) return;
      const res = await service.wxApi.getUserPhoneNumber(params.code);
      const crpty = new CryptoJSModel(params.iv)
      this.success({
        status: 200,
        success: true,
        data: res ? crpty.encrypt(res) : ""
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 分页查询用户列表
  async getListByPage() {
    const {ctx, service} = this;
    try {
      const query = ctx.query;
      const res = await service.user.queryUserList({
        page: parseInt(query.page),
        pageSize: parseInt(query.pageSize)
      });
      this.success({
        status: 200,
        success: true,
        data: res,
        formatList: true,
        page: query.page,
        pageSize: query.pageSize,
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 指定关键词查询用户
  async queryUserByKeyword() {
    const {ctx, service} = this;
    try {
      const query = ctx.query;
      const vali = await this.validate({
        key: "string"
      }, query);
      if (!vali) return;
      const res = await service.user.queryByKeyword(query.key);
      this.success({
        status: 200,
        success: true,
        data: res
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 根据ID查询用户详情
  async getUserDetailById() {
    const {ctx, service} = this;
    try {
      const query = ctx.query;
      const vali = await this.validate({
        id: "string"
      }, query);
      if (!vali) return;
      const res = await service.user.queryUserById(query.id);
      this.success({
        status: 200,
        success: true,
        data: res
      })
    } catch (e) {
      this.log(e)
    }
  }
}
