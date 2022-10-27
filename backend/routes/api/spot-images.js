const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking } = require('../../db/models');

const router = express.Router();

//Delete a spot Image
router.delete(
    '/:imageId',
    requireAuth,
    async(req, res) => {
        const spotImage = await SpotImage.findByPk(req.params.imageId)
        await spotImage.destroy()
        res.status(200)
        res.json({"message": "Successfully deleted",
        "statusCode": 200})
    }
)






module.exports = router;
