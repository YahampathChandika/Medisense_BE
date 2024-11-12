'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Dropdowns', [{
    //   id: 1,
    //   label: 'banks',
    // },{
    //   id: 2,
    //   label: 'creditApprovers',
    // },{
    //   id: 3,
    //   label: 'miniLabStatus',
    // },{
    //   id: 4,
    //   label: 'labStatus',
    // },{
    //   id: 5,
    //   label: 'xRayStatus',
    // },{
    //   id: 6,
    //   label: 'radiographers',
    // }, {
    //   id: 7,
    //   label: 'paymentMethods'
    // }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
