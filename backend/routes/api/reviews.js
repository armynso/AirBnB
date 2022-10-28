const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');

const router = express.Router();

async function requireProperAuth(req, _res, next) {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        const err = new Error("Review couldn't be found");
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 404;
        return next(err);
        }

    // console.log(review.userId, "ANDDDDDDDDDDDDDDDD", req.user.id)
    if (req.user.id === review.userId) return next();

    const err = new Error('Require proper authorization: Review must belong to the current user');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}

// Post an image
router.post(
    '/:reviewId/images',
     requireAuth,
     requireProperAuth,
     async (req, res) => {
         const { url } = req.body
         const { id, reviewId } = await ReviewImage.create({url, reviewId: req.params.reviewId})
         res.json({"id": id, "url": url})
     }
 )

// Get all reviews of current user
router.get(
    '/current',
    requireAuth,
        async (req, res) => {
            const allReviews = {"Reviews": []}
            const reviews = await Review.findAll({where: {userId: req.user.id}})
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

//Edit a review
router.put(
    '/:reviewId',
    requireAuth,
    requireProperAuth,
        async (req, res) => {
            const { review, stars} = req.body
            const currentReview = await Review.findByPk(req.params.reviewId)
            const updatedReview = await currentReview.update({ review, stars })
            res.status(200)
            res.json(updatedReview)
        }
)

//Delete a review
router.delete(
    '/:reviewId',
    requireAuth,
    requireProperAuth,
    async(req, res) => {
        const review = await Review.findByPk(req.params.reviewId)
        await review.destroy()
        res.status(200)
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }
)





module.exports = router;
