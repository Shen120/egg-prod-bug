import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.logger = {
    level: 'DEBUG',
    allowDebugAtProd: true,
  };

  config.jwt = {
    secret: 'jDE#*$KLU@h&4*$JK3j9$H54d#',
    enable: true, // 默认是关闭，如果开启，这会对所有请求进行自动校验；限定请求，请设置match做路径匹配
    match: /^\/api/, // 匹配的请求，会走jwt校验，否则忽略；例如登录接口需要被忽略；
    sign: {
      expiresIn: 7200,
    },
  };
  // 数据库
  config.sequelize = {
    datasources: [
      {
        delegate: 'model', // load all models to app.model and ctx.model
        baseDir: 'model', // load models from `app/model/blog/*.js`
        dialect: 'mysql',
        database: 'stg_satcd',
        host: '127.0.0.1',
        port: 7035,
        username: 'stg_satcd',
        password: '*fq^fH9E569h',
        define: {
          freezeTableName: true,
          underscored: false,
          timestamps: false,
          charset: "utf8mb4",
          collate: "utf8mb4_unicode_ci"
        },
      },
    ]
  };
  config.redis = {
    clients: {
      def: {
        port: 8579,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: 'G^kIrIiX8BCN',
        db: 0,
      },
      // 存储订阅事件用
      clientEvent: {
        port: 8579,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: 'G^kIrIiX8BCN',
        db: 1,
      },
      // 订阅监听用
      subscribe: {
        host: '127.0.0.1',
        port: 8579,
        password: 'G^kIrIiX8BCN',
        db: 2,
      }
    },
  };
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };
  const bizConfig = {
    // 微信支付回调地址
    wxPayCallbackUrl: "https://api-stg.ceater.cn/api/wxApi/wxPayCallback",
  }
  return {
    ...config,
    ...bizConfig
  };
};
