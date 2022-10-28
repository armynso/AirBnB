const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking } = require('../../db/models');

const router = express.Router();

async function checkBooking(req, _res, next) {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 404;
        return next(err);
        }
    return next()
}

//Get all current user's bookings
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const allBookings = {"Bookings": []}
        const bookings = await Booking.findAll({ where: {userId: req.user.id}})
        for (const booking of bookings) {
            const { id, spotId, userId, startDate, endDate, createdAt, updatedAt } = booking
            const spot = await  Spot.findOne({ where: { ownerId: req.user.id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }})
            const { url } = SpotImage.findOne({ where: {"spotId": spot.id}})
            allBookings["Bookings"].push({
                "id": id,
                "spotId": spotId,
                "Spot": {...spot["dataValues"], "PreviewImage": url || "This spot does not have a preview image"},
                "userId": userId,
                "startDate": startDate,
                "endDate": endDate,
                "createdAt": createdAt,
                "updatedAt": updatedAt
            })
        }
        res.status(200)
        res.json(allBookings)
    }
)

//Edit a booking
router.put(
    '/:bookingId',
    requireAuth,
    checkBooking,
    async (req, res) => {
        const { startDate, endDate } = req.body
        const currentBooking = await Booking.findByPk(req.params.bookingId)
        if (startDate > endDate) {
            res.status(400)
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
            })
        }
        if (currentBooking.endDate < endDate) {
            res.status(403)
            res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
            })
        }
        const updatedBooking = await currentBooking.update({ startDate, endDate })
        res.status(200)
        res.json(updatedBooking)
    }
)

//Delete a booking
router.delete(
    '/:bookingId',
    requireAuth,
    checkBooking,
    async(req, res) => {
        const booking = await Booking.findByPk(req.params.bookingId)
        await booking.destroy()
        res.status(200)
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }
)




module.exports = router;
