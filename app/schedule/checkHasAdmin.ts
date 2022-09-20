import {Subscription} from "egg";

class CheckHasAdminSubscription extends Subscription{
  static get schedule() {
    return {
      // 每天12点运行一次
      cron: '0 0 2 * * ?',
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    const {ctx, app, service} = this;
    ctx.logger.error("检测拥有admin账户失败---this：", this)
    try {
      const count = await service.adminUser.checkHasAdminUserService();
      if (count > 0) {
        // @ts-ignore
        await app.redis.get("def").set(app.config.HASADMINUSER, "true");
      } else {
        // @ts-ignore
        await app.redis.get("def").set(app.config.HASADMINUSER, "");
      }
    } catch (e) {
      ctx.logger.error("检测拥有admin账户失败：", e)
    }
  }
}

export default CheckHasAdminSubscription;
