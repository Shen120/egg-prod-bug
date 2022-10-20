'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, TEXT, BIGINT } = Sequelize;
    // 会员卡类型表
    await queryInterface.createTable("card", {
      id: {type: INTEGER(6), allowNull: false, autoIncrement: true, primaryKey: true, comment: "类型ID"},
      name: {type: STRING(50).BINARY, allowNull: false, comment: '类型名称'},
      code: {type: STRING(20).BINARY, allowNull: false, comment: "类型code"},
      enable: {type: INTEGER(1), allowNull: false, comment: "0-禁用，1-启用"},
      isDelete: {type: INTEGER(1), allowNull: false, comment: "0-未删除，1-已删除"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "创建时间(时间戳)，unix时间戳"},
      updateTime: {type: INTEGER(20), allowNull: false, comment: "更新时间(时间戳)，unix时间戳"},
      remark: {type: TEXT, allowNull: true, comment: "会员卡备注"},
    });
    // await queryInterface.addIndex("card", ["code", "isDelete", "createTime", "enable"]);

    // 用户表
    await queryInterface.createTable("user", {
      id: {type: INTEGER(10), allowNull: false, primaryKey: true, autoIncrement: true, comment: "用户ID"},
      nickName: {type: STRING(100), allowNull: false, comment: "用户昵称"},
      avatar: {type: STRING(255), allowNull: false, comment: "用户头像"},
      openId: {type: STRING(150).BINARY, allowNull: false, comment: "用户WX的openId"},
      tel: {type: STRING(11).BINARY, allowNull: true, comment: "用户的电话"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "用户创建时间(时间戳)"},
      balance: {type: BIGINT(7), allowNull: false, comment: "用户的余额，单位分"},
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
    });
    // await queryInterface.addIndex("user", ["tel", "createTime", "IDCard"]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
