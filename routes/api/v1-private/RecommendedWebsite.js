const express = require('express');
const router = express.Router();

const RecommendedWebsiteController = require('./../../../controllers/api/private/RecommendedWebsite');

router.post('/', RecommendedWebsiteController.create);
router.put('/:_id', RecommendedWebsiteController.update);
router.delete('/:_id', RecommendedWebsiteController.remove);

module.exports = router;