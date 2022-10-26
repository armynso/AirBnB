const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

// Get spots
router.get(
    '/',
     async (req, res) => {
        const spots = await Spot.findAll({})
        res.json(spots)
    }
  );

router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const newSpot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
        res.json(newSpot)
    }
)

module.exports = router;
