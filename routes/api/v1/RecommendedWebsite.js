const express = require('express');
const router = express.Router();

const RecommendedWebsiteController = require('./../../../controllers/api/RecommendedWebsite');

router.post('/', RecommendedWebsiteController.create);
router.get('/', RecommendedWebsiteController.findAll);

module.exports = router;