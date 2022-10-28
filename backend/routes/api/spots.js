const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, User, sequelize, ReviewImage } = require('../../db/models');
const { emptyQuery } = require('pg-protocol/dist/messages');
const { Model } = require('sequelize');

const router = express.Router();

async function checkSpot(req, _res, next) {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 404;
        return next(err);
        }
    return next()
}

 async function requireProperAuth(req, _res, next) {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 404;
        return next(err);
        }

    if (req.user.id === spot.ownerId) return next();

    const err = new Error('Require proper authorization: Spot must belong to the current user');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}

// Get spots
router.get(
    '/',
     async (req, res) => {
        let {page, size} = req.query;
        if (!page) page = 1;
        if (!size) size = 20;

        let pagination = {}
        if (parseInt(page) >= 1 && parseInt(size) >= 1) {
            pagination.limit = size;
            pagination.offset = size * (page - 1)
        }

        const spots = await Spot.findAll({
            include: [
                {
                    model: Review,
                    as: 'Reviews',
                    attributes: []
                },
                {
                    model: SpotImage,
                    as: 'SpotImages',
                    attributes: []
                }
            ],
            attributes: {
                    include: [[
                      sequelize.fn("AVG", sequelize.col('Review.stars')),
                      'avgRating'
                    ],
                    [
                      sequelize.col('SpotImage.url'),
                      'previewImage'
                    ]]
                },
            ...pagination})
        res.json({"Spots": spots, "page": Number(page), "size": Number(size)})
    }
  );

// Post a spot
router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const newSpot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
        res.json(newSpot)
    }
)

// Post an image
router.post(
   '/:spotId/images',
    requireAuth,
    requireProperAuth,
    async (req, res) => {
        const { url, preview } = req.body
        const newImage = await SpotImage.create({ spotId: req.params.spotId, url, preview })
        res.json(newImage)
    }
)

// Get all spots of current user
router.get(
    '/current',
    requireAuth,
        async (req, res) => {
            const spots = await Spot.findAll({where: {ownerId: req.user.id}})
            res.status(200)
            res.json(spots)
        }
);

//Get spot by Id
router.get(
'/:spotId',
checkSpot,
    async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    res.json(spot)
}
);

//Edit a spot
router.put(
'/:spotId',
    requireAuth,
    requireProperAuth,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const spot = await Spot.findByPk(req.params.spotId)
        const updatedSpot = await spot.update({address, city, state, country, lat, lng, name, description, price });
        res.json(updatedSpot)
    }
)

// Post a review for a spot
router.post(
    '/:spotId/reviews',
     requireAuth,
     checkSpot,
     async (req, res) => {
         const { review, stars} = req.body
         const count = await Review.count({ where: { userId: req.user.id, spotId: req.params.spotId }})
         if (count) {
            res.status(403)
            return res.json({
                errors: [
                    { message: "Previous Review For User/Spot Already Exists"}
                ]
            })
         }
         const newReview = await Review.create({ userId: req.user.id, spotId: req.params.spotId, review, stars })
         res.json(newReview)
     }
 )

//Get reviews by spot Id
router.get(
    '/:spotId/reviews',
    checkSpot,
        async (req, res) => {
            const allReviews = {"Reviews": []}
            const reviews = await Review.findAll({where: {spotId: req.params.spotId}})
            for (const review of reviews) {
                const { id, firstName, lastName } = await User.findByPk(review.userId)
                const spot = await Spot.findByPk(review.spotId)
                const reviewImages = await ReviewImage.findAll({where: {reviewId: review.id},
                    attributes: {
                        exclude: ["reviewId", "createdAt", "updatedAt"]
                    }
                })
                const currentReview = {
                    ...review.dataValues,
                    "User": {
                    "id": id,
                    "firstName": firstName,
                    "lastName" : lastName
                },
                "Spot": spot,
                "ReviewImages": reviewImages

            }
                allReviews["Reviews"].push(currentReview)
            }
        res.status(200)
        res.json(allReviews)
        }
);

//Create a booking based on Spot Id
router.post(
    '/:spotId/bookings',
     requireAuth,
     checkSpot,
     async (req, res) => {
         const { startDate, endDate } = req.body

         const count = await Booking.count({ where: { spotId: req.params.spotId, startDate, endDate }})
         if (count) {
            res.status(403)
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates"
         })
        }
         const newBooking = await Booking.create({  spotId: req.params.spotId, userId: req.user.id, startDate, endDate })
         res.status(200)
         res.json(newBooking)
     }
 )

 //Get all bookings for a spot by id
router.get(
    '/:spotId/bookings',
    requireAuth,
    checkSpot,
    async (req, res) => {
        let allBookings = {
            "Bookings": []
        }
        const spot = await Spot.findByPk(req.params.spotId)
        const allUsers = await Booking.findAll({ where: {spotId: spot.id}})
        if (spot.ownerId === req.user.id) {

            for (const booking of allUsers) {
                let { id, firstName, lastName} = await User.findByPk(booking.userId)
                allBookings["Bookings"].push({"Users": {id, firstName, lastName},
                "id": booking.id,
                "spotId": booking.spotId,
                "userId": booking.userId,
                 "startDate": booking.startDate,
                 "endDate": booking.endDate,
                 "createdAt": booking.createdAt,
                 "updatedAt": booking.updatedAt
                })
            }
        }
        else {allBookings["Bookings"].push(await Booking.findAll({
            where: {userId: req.user.id}, attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId', 'id']
            }})
        )}
        res.status(200)
        res.json(allBookings)
    }
)

//Delete a spot
router.delete(
    '/:spotId',
    requireAuth,
    checkSpot,
    async(req, res) => {
        const spot = await Spot.findByPk(req.params.spotId)
        await spot.destroy()
        res.status(200)
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }
)

module.exports = router;
