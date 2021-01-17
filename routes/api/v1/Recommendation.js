const express = require('express');
const router = express.Router();

const RecommendationController = require('./../../../controllers/api/public/Recommendation');

router.get('/', RecommendationController.findAll);

module.exports = router;