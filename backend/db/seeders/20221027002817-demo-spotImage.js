'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "SpotImages"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { SpotImage } = require('../models')
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://media.architecturaldigest.com/photos/62b6036de8be957a9ea4ccac/master/w_1600%2Cc_limit/The%2520Boot%2520-%2520New%2520Zealand.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hb-luxury-airbnbs-santorini-1531317651.png',
        preview: true
      }
      // {
      //   spotId: 3,
      //   url: 'image.url',
      //   preview: true
      // },
      // {
      //   spotId: 4,
      //   url: 'image.url',
      //   preview: true
      // },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      // {
      //   preview: { [Op.in]: true }
      // },
      {});
  }
};
