const handles: any = {};// 定义处理任务列表
module.exports = {
  /**
   * @description 添加订单延时任务
   */
  async addTask(id, delay = 10, task = 'order_task') {
    await this.redis.get("clientEvent").setex(id, delay, task, error => {
      if (error) {
        console.log('任务设置失败');
      } else {
        console.log('任务设置成功');
      }
    });
  },
  /**
   * @description 注册处理任务
   * @param type{string} 处理任务类型
   * @param handle{function} 处理的函数
   */
  registerTaskHandler(type, handle) {
    if (!type) {
      throw new Error('type不能为空');
    }
    if (typeof handle !== 'function') {
      throw new Error('handler类型非function');
    }
    handles[type] = handle;// 把处理事件存储在map里
  },
  /**
   * @description 初始化延时任务，使用订阅者数据库进行订阅,超时就取消订单,__keyevent@第几个数据库__
   * @return string 订单号
   */
  initDelayTask() {
    this.redis.get('subscribe').psubscribe('__keyevent@1__:expired');
    this.redis.get('subscribe').on('pmessage', (_channel, _message, key) => {
      const handle = handles.cancelOrder;
      console.log('取消过期成功: ', key);
      handle(key).then(() => {
        console.log('------initDelayTask订单成功------');
      }).catch(e => {
        console.log('------取消订单失败------', e);
      });// 处理取消订单

      return key;
    });
  },
};