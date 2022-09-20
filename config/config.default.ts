import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';
import * as path from "path";
const { I18n } = require('i18n')

const i18n = new I18n({
  locales: ['zh-CN'],
  defaultLocale: 'zh-CN',
  directory: path.join(__dirname, "/locale"),
})

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1651840003678_2164';

  // add your egg config in here
  config.middleware = [
    'errorHandler',
  ];
  config.proxy = true;

  config.logger = {
    dir: path.join(__dirname, '../logs')
  }

  config.validate = {
    // convert: false,
    // validateRoot: false,
    translate() {
      const args = Array.prototype.slice.call(arguments);
      return i18n.__.apply(i18n, args);
    }
  }

  config.security = {
    // 若用户没有配置 domainWhiteList 或者 domainWhiteList数组内为空，则默认会对所有跳转请求放行，即等同于ctx.unsafeRedirect(url)
    // domainWhiteList: [],
    csrf: {
      headerName: 'token',
      ignore: (ctx) => ctx.path.indexOf("/api/wxApi") > -1
    }
  };

  config.redisKeys = {
    loginList: "adminUserLoginList",
    // 微信支付预订单集合
    advanceOrder: "advanceOrderList",
    // 账单在数据库无此数据，而微信支付查到此条数据，自动添加到redis，做通知用
    autoInsertBillKey: "autoInsertBillList"
  }

  // 设置跨域
  config.cors = {
    // 设置来源
    origin: "*",
    // 带cookie
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'Accept',
      'authorization',
      'X-Requested-With',
      'set-cookie',
      'token',
    ],
  };

  // add your special config in here
  const bizConfig = {
    /**
     * 程序基本配置
     */
    verifyKey: (uk: string) => `verifyKey_${uk}`,
    /**
     * 微信小程序配置
     */
    wxAppID: "",
    wxAppSecret: "",
    // 微信登录授权地址 get
    // wxCode2SessionUrl: (code: string) => ``,
    // 微信用户风控等级地址 post
    // wxUserRiskRankUrl: (token: string) => ``,
    // 全局使用的微信access_token
    wxAccessTokenUrl: () => ``,
    // 获取用户的手机号
    // wxGetPhoneNumber: (accessToken: string) => ``,
    // redis存储WX Access token 的key
    wxAccessTokenRedisKey: "wxAccessToken",
    // 微信支付回调地址
    // wxPayCallbackUrl: "",
    // 微信预订单号key
    advanceOrderKey: (orderNo: string) => `advanceOrder_${orderNo}`,
    // 发送订阅消息接口-post
    wxSendSubscribeMsg: (accessToken: string) => `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`,
    /**
     * 极验配置
     */
    GEETEST_ID: "",
    GEETEST_KEY: "",
    REDIS_HOST: "127.0.0.1",
    REDIS_PORT: "6379",
    BYPASS_URL: "",
    CYCLE_TIME: 10,
    // 极验验证API服务状态Session Key
    GEETEST_BYPASS_STATUS_KEY: "gt_server_bypass_status",
    // 电话号码加密秘钥
    PHONEKEY: "pho23$3%&n<23x?fasFS7SDe",
    // 已有注册用户的redisKey
    HASADMINUSER: "hasAdminUser"
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
