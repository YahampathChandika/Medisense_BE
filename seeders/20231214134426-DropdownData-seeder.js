'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('DropdownData', [{
    //   id: 1,
    //   label: 'BOC',
    //   dropdownId: 1
    // },{
    //   id: 3,
    //   label: 'HNB',
    //   dropdownId: 1
    // },{
    //   id: 4,
    //   label: 'Sampath Bank',
    //   dropdownId: 1
    // },{
    //   id: 5,
    //   label: 'Commercial Bank',
    //   dropdownId: 1
    // },{
    //   id: 6,
    //   label: 'Mr.Rohan',
    //   dropdownId: 2
    // },{
    //   id: 7,
    //   label: 'Mr. Mario',
    //   dropdownId: 2
    // },{
    //   id: 8,
    //   label: 'Blood Extracted',
    //   dropdownId: 3
    // },{
    //   id: 9,
    //   label: 'Blood Not Extracted',
    //   dropdownId: 3
    // },{
    //   id: 10,
    //   label: 'Not Approved',
    //   dropdownId: 3
    // },{
    //   id: 11,
    //   label: 'Approved',
    //   dropdownId: 4
    // },{
    //   id: 12,
    //   label: 'Not Approved',
    //   dropdownId: 4
    // },{
    //   id: 13,
    //   label: 'Normal',
    //   dropdownId: 5
    // },{
    //   id: 14,
    //   label: 'Abnormal',
    //   dropdownId: 5
    // },{
    //   id: 15,
    //   label: 'Repeat',
    //   dropdownId: 5
    // },{
    //   id: 16,
    //   label: 'Taken',
    //   dropdownId: 5
    // },{
    //   id: 17,
    //   label: 'Not Taken',
    //   dropdownId: 5
    // },{
    //   id: 18,
    //   label: 'John Doe',
    //   dropdownId: 6
    // },{
    //   id: 19,
    //   label: 'Paul Morphy',
    //   dropdownId: 6
    // }, {
    //   id: 20,
    //   label: 'Cash',
    //   dropdownId: 7
    // }
    // ,{
    //   id: 21,
    //   label: 'Check',
    //   dropdownId: 7
    // }, {
    //   id: 22,
    //   label: 'Credit',
    //   dropdownId: 7
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
