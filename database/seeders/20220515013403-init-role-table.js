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
