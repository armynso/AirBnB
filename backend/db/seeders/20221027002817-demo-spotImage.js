'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
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
      },
      {
        spotId: 3,
        url: 'https://happho.com/wp-content/uploads/2017/04/02-2.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.trendir.com/wp-content/uploads/old/house-design/assets_c/2014/06/bridged-split-house-lake-designed-around-view-1-thumb-970xauto-44001.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://suzannelovellinc.com/wp-content/uploads/2018/06/moon_hoon_simple_house_jeju_city_south_korea_designboom_1800.0-1132x712.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/eede56fa-47fe-489f-bb04-7ea723dfa696-christine-mcconnell-halloween-house-web.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://luxury-houses.net/wp-content/uploads/2021/04/Stunning-high-tech-architectural-design-of-21.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://www.hollywoodreporter.com/wp-content/uploads/2022/08/1575-Capri_002-h-2022.jpg?w=1296',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.gobankingrates.com/wp-content/uploads/2019/06/01-Other-Worldly-Residence-in-Rancho-Santa-Fe-California-Sothebys.jpg',
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
