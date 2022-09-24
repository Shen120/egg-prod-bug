import {Application} from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt);

  /**
   * 会员卡
   */
  // 创建会员卡
  router.post('/api/card/create', jwt, controller.card.create);
  // 删除会员卡
  router.delete('/api/card/delete', jwt, controller.card.delete);
  // 更新商品
  router.post('/api/card/update', jwt, controller.card.update);
  // 高级查询会员卡
  router.get('/api/card/queryByPage', jwt, controller.card.getListByPage);
  // 查询所有会员卡
  router.get("/api/card/queryAllType", jwt, controller.card.queryAllList);

  /**
   * 管理后台接口
   */
  // 查询用户列表
  router.get("/api/user/queryByPage", jwt, controller.user.getListByPage);
  // 手机号或会员卡号查询用户
  router.get("/api/user/queryByKeyword", jwt, controller.user.queryUserByKeyword);
  // 根据ID查询用户
  router.get("/api/user/queryByUserId", jwt, controller.user.getUserDetailById);


};
