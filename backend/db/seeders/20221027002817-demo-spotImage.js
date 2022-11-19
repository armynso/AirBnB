'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { SpotImage } = require('../models')
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/89184/pexels-photo-89184.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/6186848/pexels-photo-6186848.jpeg',
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

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages',
    // {
    //   preview: { [Op.in]: true }
    // },
    {});
  }
};
