const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking } = require('../../db/models');

const router = express.Router();

//Delete a review Image
router.delete(
    '/:imageId',
    requireAuth,
    async(req, res) => {
        const spotImage = await SpotImage.findByPk(req.params.imageId)
        if (!spotImage) {
            res.status(404)
            res.json({
                "message": "Spot Image couldn't be found",
                "statusCode": 404
              })
        }
        await spotImage.destroy()
        res.status(200)
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }
)






module.exports = router;
