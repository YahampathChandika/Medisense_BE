'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  //   await queryInterface.bulkInsert('Jobs', [{
  //     job: 'Driver',
  //     description: 'Driver' 
  //   }, {
  //     job: 'Janitor',
  //     description: 'Janitor' 
  //   }, {
  //     job: 'Doctor',
  //     description: '' 
  //   }, {
  //     job: 'Engineer',
  //     description: '' 
  //   }, {
  //     job: 'Accountant',
  //     description: '' 
  //   }, {
  //     job: 'Teacher',
  //     description: '' 
  //   }, {
  //     job: 'Lecturer',
  //     description: '' 
  //   }, {
  //     job: 'Plumber',
  //     description: '' 
  //   }, {
  //     job: 'Musician',
  //     description: '' 
  //   }, {
  //     job: 'Engineer',
  //     description: '' 
  //   }, {
  //     job: 'Nurse',
  //     description: '' 
  //   }, {
  //     job: 'Cook',
  //     description: '' 
  //   }, {
  //     job: 'Cashier',
  //     description: '' 
  //   }, {
  //     job: 'Lawyer',
  //     description: '' 
  //   },]);
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
