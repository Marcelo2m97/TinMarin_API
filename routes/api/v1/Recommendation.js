const express = require('express');
const router = express.Router();

const RecommendationController = require('./../../../controllers/api/Recommendation');

router.post('/', RecommendationController.create);
router.get('/', RecommendationController.findAll);
router.delete('/:_id', RecommendationController.remove);

module.exports = router;