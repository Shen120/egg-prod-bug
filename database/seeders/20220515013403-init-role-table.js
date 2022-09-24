'use strict';

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // 初始化权限列表
    await queryInterface.bulkInsert("role", [
      {code: "superAdministrator", name: "超级管理员"},
      {code: "admin", name: "管理员"},
      {code: "operator", name: "业务员"},
    ]);
    // 初始化杂项表
    await queryInterface.bulkInsert("sundry", [
      {id: 1, maxID: ""}
    ]);
    // 初始化会员卡类型表
    await queryInterface.bulkInsert("card", [
      {
        id: 1,
        name: "默认会员卡类型",
        code: "default",
        enable: 1,
        isDelete: 0,
        remark: "默认会员卡类型",
        createTime: Math.floor(Date.now() / 1000),
        updateTime: Math.floor(Date.now() / 1000)
      }
    ]);
    // 初始化金额充值表
    await queryInterface.bulkInsert("recharge_price", [
      {id: 1, price: 1000, remarks: ""},
      {id: 2, price: 2000, remarks: ""},
      {id: 3, price: 3000, remarks: ""},
      {id: 4, price: 5000, remarks: ""},
      {id: 5, price: 8000, remarks: ""},
      {id: 6, price: 10000, remarks: ""},
    ]);
    // 初始化商品类型表
    await queryInterface.bulkInsert("goodsType", [
      {
        id: 1,
        name: "默认类型",
        description: "",
        code: "default",
        image: "",
        remark: "",
        enable: 1,
        isDelete: 0,
        createTime: Math.floor(Date.now() / 1000),
        updateTime: Math.floor(Date.now() / 1000)
      }
    ])
    // 初始化商品表
    await queryInterface.bulkInsert("commodity", [
      {
        id: 1,
        goodsTypeID: 1,
        name: "默认商品",
        code: "default",
        description: "",
        image: "",
        price: 5000,
        remark: "",
        enable: 1,
        isDelete: 0,
        createTime: Math.floor(Date.now() / 1000),
        updateTime: Math.floor(Date.now() / 1000)
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
