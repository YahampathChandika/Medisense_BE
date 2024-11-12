'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    // await queryInterface.bulkInsert('Roles', [
    //   {
    //   id: 1, 
    //   role: 'Admin',
    // },{
    //   id: 2,
    //   role: 'Reception',
    // },{
    //   id: 3,
    //   role: 'Cashier',
    // },{
    //   id: 4,
    //   role: 'Accounts',
    // },{
    //   id: 5,
    //   role: 'Lab',
    // },{
    //   id: 6,
    //   role: 'Mini LAb',
    // },{
    //   id: 7,
    //   role: 'Doctor',
    // },{
    //   id: 8,
    //   role: 'X-Ray',
    // },]);

  },

  async down (queryInterface, Sequelize) {

    // await queryInterface.bulkDelete('Roles', null, { truncate: true, cascade: true });

  }
};
