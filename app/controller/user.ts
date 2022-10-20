import {Controller} from "egg";

export default class UserController extends Controller {

  // 分页查询用户列表
  async getListByPage() {
    const {ctx, service} = this;
    try {
      const query = ctx.query;
      const res = await service.user.queryUserList({
        page: parseInt(query.page),
        pageSize: parseInt(query.pageSize)
      });
      /* send request body */
      // this.success({
      //   status: 200,
      //   success: true,
      //   data: res,
      //   formatList: true,
      //   page: query.page,
      //   pageSize: query.pageSize,
      // })
    } catch (e) {
      // this.log(e)
    }
  }

  // 根据ID查询用户详情
  async getUserDetailById() {
    const {ctx, service} = this;
    try {
      const query = ctx.query;
      const res = await service.user.queryUserById(query.id);
      /* send request body */
      // this.success({
      //   status: 200,
      //   success: true,
      //   data: res
      // })
    } catch (e) {
      // this.log(e)
    }
  }
}
