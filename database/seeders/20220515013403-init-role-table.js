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
