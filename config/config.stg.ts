import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.logger = {
    level: 'DEBUG',
    allowDebugAtProd: true,
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
  const bizConfig = {
    // 微信支付回调地址
    wxPayCallbackUrl: "",
  }
  return {
    ...config,
    ...bizConfig
  };
};
