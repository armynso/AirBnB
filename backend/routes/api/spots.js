const express = require('express')

// const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get spots
router.get(
    '/',
     async (req, res) => {
        const spot = await Spot.findAll()
        res.json(spot)
    }
  );
