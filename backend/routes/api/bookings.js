const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking } = require('../../db/models');

const router = express.Router();

//Get all current user's bookings
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const allBookings = await Booking.findAll({ where: {userId: req.user.id}})
        res.status(200)
        res.json(allBookings)
    }
)






module.exports = router;
