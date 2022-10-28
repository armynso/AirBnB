const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');

const router = express.Router();


//Delete a spot Image
router.delete(
    '/:imageId',
    requireAuth,
    async(req, res) => {
        const reviewImage = await ReviewImage.findByPk(req.params.imageId)
        if (!reviewImage) {
            res.status(404)
            res.json({
                "message": "Review Image couldn't be found",
                "statusCode": 404
              })
        }
        await reviewImage.destroy()
        res.status(200)
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }
)






module.exports = router;
