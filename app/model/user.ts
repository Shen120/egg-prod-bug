module.exports = app => {
  // 用户表
  const {INTEGER, STRING, BIGINT} = app.Sequelize;
  const User = app.model.define('user', {
    id: {type: INTEGER(10), allowNull: false, primaryKey: true, autoIncrement: true, comment: "用户ID"},
    nickName: {type: STRING(100), allowNull: false, comment: "用户昵称"},
    avatar: {type: STRING(255), allowNull: false, comment: "用户头像"},
    openId: {type: STRING(150).BINARY, allowNull: false, comment: "用户WX的openId"},
    tel: {type: STRING(11).BINARY, allowNull: true, comment: "用户的电话"},
    createTime: {type: INTEGER(20), allowNull: false, comment: "用户创建时间(时间戳)"},
    balance: {type: BIGINT(7), allowNull: false, comment: "用户的余额,单位分"},
    IDCard: {type: STRING(11).BINARY, allowNull: false, comment: "用户卡号"},
    cardTypeID: {
      type: INTEGER(6),
      allowNull: false,
      comment: "用户卡类型ID（与用户卡类型表绑定）",
      references: {
        model: 'card',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
    },
    bindWX: {type: INTEGER(1), allowNull: false, comment: "0-未绑定微信, 1-已绑定微信"},
    loginTime: {type: INTEGER(20), allowNull: false, comment: "用户登录时间(时间戳)，unix时间戳"},
    lastRechargeTime: {type: INTEGER(20), allowNull: true, comment: "用户最后一次充值时间(时间戳)，unix时间戳"},
  }, {
    // 添加普通索引
    indexes: [
      {unique: false, fields: ["tel", "createTime", "IDCard"]}
    ]
  });
  User.associate = () => {
    app.model.User.belongsTo(app.model.Card, {foreignKey: 'cardTypeID', targetKey: "id"});
  }
  return User
}
