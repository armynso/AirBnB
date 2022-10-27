const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');

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
        const spots = await Spot.findAll({})
        res.json(spots)
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

// Post an image
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

module.exports = router;
