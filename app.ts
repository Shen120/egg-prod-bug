class AppBootHook {
  // private app;

  // @ts-ignore
  constructor(app) {
    // this.app = app;
  }

  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
  }

  async willReady() {
    /**
     * 保证应用启动监听端口前数据已经准备好了
     * 后续数据的更新由定时任务自动触发
     */

    // 更新微信access_token
    // await this.app.runSchedule('./updateWxToken');

    // 检查极验服务器联通状态
    // await this.app.runSchedule('./geetest_bypass');

    // 检测是否已有admin用户-每天检测一次
    // await this.app.runSchedule('./checkHasAdmin');

    // 注册微信充值订单过期监听
    // const ctx = this.app.createAnonymousContext();// 创建匿名上下文
    // await this.app.initDelayTask();
    // order_id - 商户订单号
    // await this.app.registerTaskHandler('cancelOrder', async (order_id: string) => {
    //   await ctx.service.wxPay.queryOrderById(order_id)
    // });
  }
}

module.exports = AppBootHook;
