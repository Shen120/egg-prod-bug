import { Controller } from 'egg';
import { Redis } from "ioredis";
import {SafeAdminUser, SafeUser} from "../class";
// import { CryptoJSModel } from '../utils';
//
// const keyJson = require("../public/keys.json");

type SuccessParams = {
  status: number,
  success: boolean,
  data?: any,
  errorMessage?: string | unknown,
  formatList?: boolean,
  page?: number | string,
  pageSize?: number | string
  setCookie?: boolean;
  clearCookie?: boolean;
}

type SocketParams = {
  success: boolean;
  action: string;
  errorMessage?: string,
  payload?: any;
  metadata?: any;
}

class BaseController extends Controller {
  // 获取管理用户信息
  get user(): SafeAdminUser {
    return this.ctx.state.user;
  }

  // 获取当前微信登录用户
  get wxUser(): SafeUser {
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

  getHead(key) {
    return this.ctx.get(key)
  }

  success(params: SuccessParams) {
    const {status, success, data, errorMessage, formatList, pageSize, page, setCookie, clearCookie} = params;
    if (setCookie) {
      // const crypto = new CryptoJSModel(this.app.config.jwt.secret);
      // const encode = crypto.encrypt(keyJson.csrf);
      // this.ctx.cookies.set("csrfToken", encode, {
      //   maxAge: this.app.config.jwt.sign.expiresIn,
      //   path: "/"
      // });
      // this.ctx.session.csrfToken = encode;
    }
    if (clearCookie) {
      // this.ctx.cookies.set("csrfToken", null);
      // this.ctx.session.csrfToken = null;
    }
    this.ctx.body = {
      success: success,
      data: formatList ? this.formatList(page, pageSize, data) : data,
      errorMessage: errorMessage,
    };
    this.ctx.status = status;
  }

  validate(rules: { [key: string]: any }, data?: any): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.ctx.validate(rules, data);
        resolve(true)
      } catch (err: any) {
        const errors: [ { message: string, code: string, field: string } ] = err.errors || [];
        let msg = '';
        for (let i = 0; i < errors.length; i++) {
          const item = errors[i];
          msg = `"${item.field}"${item.code}`
        }
        this.success({
          status: 200,
          success: false,
          errorMessage: msg
        })
        resolve(false)
      }
    })
  }

  /**
   * format socket send msg body
   * @param params
   */
  parseMsg(params: SocketParams) {
    const {action, payload = {}, metadata = {}, success} = params;
    const meta = Object.assign(
      {},
      {
        timestamp: Date.now(),
      },
      metadata,
    );

    return {
      success,
      meta,
      data: {
        action,
        payload,
      },
    };
  }

  /**
   * 发送socket消息内容
   * @param data {SocketParams}
   * @param socketId
   */
  socketSend(data: SocketParams, socketId?: string) {
    console.log("开始发送：",socketId)
    try {
      const nsp: any = this.app.io.of('/');
      const client = this.ctx.socket.id;
      const msg = this.parseMsg(data);
      if (socketId) {
        nsp.server.sockets.to(socketId).emit(data.action, msg)
      } else {
        msg.meta["client"] = client;
        nsp.server.sockets.emit(data.action, msg)
      }
    } catch (e) {
      this.ctx.logger.error("socket消息未发送成功：", e)
    }
  }

  /**
   * 格式化 Sequelize 的 findAndCountAll 返回的数据列表
   * @param page
   * @param pageSize
   * @param result
   */
  formatList(page?: number | string, pageSize?: number | string, result?: any) {
    page = page && typeof page === "string" ? parseInt(page, 10) : page;
    pageSize = pageSize && typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize;
    return {
      list: result ? result.rows : [],
      total: result ? result.count : result.rows.length,
      current: page || 0,
      pageSize: pageSize || 15,
    }
  }

  // log(status: number, params?: any, errorMsg?: any) {
  //   const {ctx, service} = this;
  //   const data = {
  //     requestParams: params ? JSON.stringify(params) : "",
  //     url: ctx.request.url,
  //     requestType: ctx.request.method,
  //     requestUser: this.ctx.state.userID || "",
  //     createTime: moment().unix(),
  //     responseStatus: status,
  //     errorMsg: errorMsg ? JSON.stringify(errorMsg) : ""
  //   };
  //   service.log.create(data);
  // }

  log(err) {
    this.ctx.logger.error(err);
    // this.ctx.throw(400);
    throw new Error(err)
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

export default BaseController;
