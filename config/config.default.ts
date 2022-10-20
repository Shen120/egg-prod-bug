import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';
import * as path from "path";
const { I18n } = require('i18n')

const i18n = new I18n({
  locales: ['zh-CN'],
  defaultLocale: 'zh-CN',
  directory: path.join(__dirname, "/locale"),
});

const whiteList = [
  'http://192.168.31.245:8000',
];

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_16518400035678_2164';

  // add your egg config in here
  config.proxy = true;

  config.logger = {
    // dir: path.join(__dirname, '../logs'),
    level: 'DEBUG',
    allowDebugAtProd: true,
  }

  config.validate = {
    // convert: false,
    // validateRoot: false,
    translate() {
      const args = Array.prototype.slice.call(arguments);
      return i18n.__.apply(i18n, args);
    }
  }

  config.ipHeaders = 'X-Real-Ip, X-Forwarded-For';
  config.hostHeaders = 'X-Forwarded-Host';

  config.security = {
    // 若用户没有配置 domainWhiteList 或者 domainWhiteList数组内为空，则默认会对所有跳转请求放行，即等同于ctx.unsafeRedirect(url)
    domainWhiteList: whiteList,
    csrf: {
      enable: false,
      // headerName: 'token',
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
  /**
   * CORS middleware
   *
   * @param {Object} [options]
   *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
   *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
   *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
   *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
   *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
   *  - {Boolean|Function(ctx)} credentials `Access-Control-Allow-Credentials`, default is false.
   *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
   *  - {Boolean} secureContext `Cross-Origin-Opener-Policy` & `Cross-Origin-Embedder-Policy` headers.', default is false
   *  - {Boolean} privateNetworkAccess handle `Access-Control-Request-Private-Network` request by return `Access-Control-Allow-Private-Network`, default to false
   * @return {Function} cors middleware
   * @api public
   */
  config.cors = {
    // 设置来源
    origin: function (ctx) {
      const list = [
        '192.168.31.245:8000',
      ];
      const idx = list.findIndex(host => {
        const origin: any  = ctx.request.header.origin;
        const reg = new RegExp(`^http(s)?://${host}(\\/)?$`);
        return reg.test(origin)
      });
      if (idx > -1) {
        return (ctx.request.header.origin) as string
      } else {
        return "http://192.168.31.245:8000"
      }
    },
    // 带cookie
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'Accept',
      'authorization',
      'X-Requested-With',
      'token',
      "Cookie",
      "x-csrf-token"
    ],
    exposeHeaders: [
      // "Set-Cookie",
      // "set-cookie"
    ]
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
    // wxCode2SessionUrl: (code: string) => `https://api.weixin.qq.com/sns/jscode2session?appid=${bizConfig.wxAppID}&secret=${bizConfig.wxAppSecret}&js_code=${code}&grant_type=authorization_code`,
    // 微信用户风控等级地址 post
    // wxUserRiskRankUrl: (token: string) => `https://api.weixin.qq.com/wxa/getuserriskrank?access_token=${token}`,
    // 全局使用的微信access_token
    // wxAccessTokenUrl: () => `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${bizConfig.wxAppID}&secret=${bizConfig.wxAppSecret}`,
    // 获取用户的手机号
    // wxGetPhoneNumber: (accessToken: string) => `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`,
    // redis存储WX Access token 的key
    // wxAccessTokenRedisKey: "wxAccessToken",
    // 微信预订单号key
    // advanceOrderKey: (orderNo: string) => `advanceOrder_${orderNo}`,
    // 发送订阅消息接口-post
    // wxSendSubscribeMsg: (accessToken: string) => ``,
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
    GEETEST_BYPASS_STATUS_KEY: "",
    // 电话号码加密秘钥
    PHONEKEY: "",
    // 已有注册用户的redisKey
    HASADMINUSER: "hasAdminUser"
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
