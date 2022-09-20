import {Service} from "egg";
import {Redis} from "ioredis";

class BaseService extends Service{
  // 获取当前微信登录用户
  get wxUser() {
    return this.ctx.state.wxUser
  }

  // 获取redis
  get redisDef(): Promise<Redis> {
    return new Promise(async resolve => {
      const r = await this.app.redis.get("def") as unknown as Redis;
      resolve(r)
    })
  }

  // 获取redis
  get redisSub(): Promise<Redis> {
    return new Promise(async resolve => {
      const r = await this.app.redis.get("def") as unknown as Redis;
      resolve(r)
    })
  }

}

export default BaseService;