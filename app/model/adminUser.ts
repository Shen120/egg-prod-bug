module.exports = app => {
  // 管理用户表
  const {INTEGER, STRING} = app.Sequelize;
  const AdminUser = app.model.define('adminUser', {
    id: {type: INTEGER(6), allowNull: false, primaryKey: true, autoIncrement: true, comment: "角色ID"},
    account: {type: STRING(50).BINARY, allowNull: false, comment: "管理用户的名字，登录用"},
    pwd: {type: STRING(100), allowNull: false, comment: "管理用户的密码"},
    nickName: {type: STRING(50).BINARY, allowNull: false, comment: "管理用户的昵称"},
    roleId: {
      type: INTEGER(3),
      allowNull: false,
      comment: "管理用户的角色ID(与角色表ID绑定)",
      references: {
        model: "role",
        key: "id"
      },
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION"
    },
    enable: {type: INTEGER(1), allowNull: false, comment: "0-禁用，1-启用"},
    isDelete: {type: INTEGER(1), allowNull: false, comment: "0-未删除，1-已删除"},
    createTime: {type: INTEGER(20), allowNull: false, comment: "管理用户创建时间(时间戳)，unix时间戳"},
    updateTime: {type: INTEGER(20), allowNull: false, comment: "管理用户更新时间(时间戳)，unix时间戳"}
  }, {
    // 添加普通索引
    indexes: [
      {unique: false, fields: ["account", "nickName", "createTime"]}
    ]
  });
  AdminUser.associate = () => {
    app.model.AdminUser.belongsTo(app.model.Role, {foreignKey: 'roleId', targetKey: "id"});
  }
  return AdminUser
}
