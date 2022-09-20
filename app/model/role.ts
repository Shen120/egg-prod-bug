module.exports = app => {
  // 角色表
  const {INTEGER, STRING} = app.Sequelize;
  const Role = app.model.define('role', {
    id: {type: INTEGER(3), allowNull: false, primaryKey: true, autoIncrement: true, comment: "角色ID"},
    code: {type: STRING(20).BINARY, allowNull: false, comment: "权限CODE"},
    name: {type: STRING(50), allowNull: false, comment: "权限名称"},
  });
  return Role
}