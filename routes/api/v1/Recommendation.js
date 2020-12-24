const express = require('express');
const router = express.Router();

const RecommendationController = require('./../../../controllers/api/Recommendation');

router.post('/', RecommendationController.create);
router.get('/', RecommendationController.findAll);

module.exports = router;