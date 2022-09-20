import {Application} from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt);

  // 验证是否已有管理用户
  router.get("/api/common/checkHasAdmin", jwt, controller.adminUser.queryHasAdmin)


  // 管理用户注册
  router.post('/api/adminUser/sign', jwt, controller.adminUser.sign);

};
