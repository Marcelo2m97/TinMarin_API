const express = require('express');
const router = express.Router();

const RecommendedWebsiteController = require('./../../../controllers/api/public/RecommendedWebsite');

router.get('/', RecommendedWebsiteController.findAll);

module.exports = router;