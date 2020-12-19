const express = require('express');
const router = express.Router();

const RecommendationController = require('./../../../controllers/api/Recommendation');

router.use('/', RecommendationController.create);

module.exports = router;