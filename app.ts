class AppBootHook {
  private app;

  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
  }

  async willReady() {
    /**
     * 保证应用启动监听端口前数据已经准备好了
     * 后续数据的更新由定时任务自动触发
     */

    // 检测是否已有admin用户-每天检测一次
    await this.app.runSchedule('./checkHasAdmin');

  }
}

module.exports = AppBootHook;
