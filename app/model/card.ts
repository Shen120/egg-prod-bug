module.exports = app => {
  // 会员卡类型表
  const {INTEGER, STRING, TEXT} = app.Sequelize;
  const Card = app.model.define('card', {
    id: {type: INTEGER(6), allowNull: false, autoIncrement: true, primaryKey: true, comment: "类型ID"},
    name: {type: STRING(50).BINARY, allowNull: false, comment: '类型名称'},
    code: {type: STRING(20).BINARY, allowNull: false, comment: "类型code"},
    createTime: {type: INTEGER(20), allowNull: false, comment: "创建时间(时间戳)，unix时间戳"},
    updateTime: {type: INTEGER(20), allowNull: false, comment: "更新时间(时间戳)，unix时间戳"},
    enable: {type: INTEGER(1), allowNull: false, comment: "0-禁用，1-启用"},
    isDelete: {type: INTEGER(1), allowNull: false, comment: "0-未删除，1-已删除"},
    remark: {type: TEXT, allowNull: true, comment: "会员卡备注"},
  }, {
    // 添加普通索引
    indexes: [
      {unique: false, fields: ["code", "isDelete", "createTime", "enable"]}
    ]
  });
  return Card
}
