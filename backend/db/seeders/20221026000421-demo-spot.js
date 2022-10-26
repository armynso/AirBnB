'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 street',
        city: 'dc',
        state: 'virginia',
        country: 'USA',
        lat: 27.7648569,
        lng: -124.4731247,
        name: 'Apple',
        description: 'Place where I sleep',
        price: 189
      },
      {
        ownerId: 2,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 street', '123 Disney Lane'] }
    }, {});
  }
};
