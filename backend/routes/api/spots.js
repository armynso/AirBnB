const express = require('express')

const { Spot, User } = require('../../db/models');

const router = express.Router();

// Get spots
router.get(
    '/',
     async (req, res) => {
        const spots = await Spot.findAll({})
        res.json(spots)
    }
  );


module.exports = router;
