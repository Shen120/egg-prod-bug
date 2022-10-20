import {Application} from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  /**
   * 管理后台接口
   */
  // 查询用户列表
  router.get("/api/user/queryByPage", controller.user.getListByPage);
  // 根据ID查询用户
  router.get("/api/user/queryByUserId", controller.user.getUserDetailById);


};
