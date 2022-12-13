'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Spots"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '4456 Quincy Street',
        city: 'Eagleville',
        state: 'New York',
        country: 'USA',
        lat: 27.7648569,
        lng: -124.4731247,
        name: 'The Nest',
        description: 'The Nest offers a true escape... breathtaking views along with an architecturally charming retreat. ',
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

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 street', '123 Disney Lane'] }
    }, {});
  }
};
