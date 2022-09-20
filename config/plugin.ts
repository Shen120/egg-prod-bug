import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  io: {
    enable: false,
    package: 'egg-socket.io',
  },
  redis:{
    enable: true,
    package: 'egg-redis',
  }
};

export default plugin;
