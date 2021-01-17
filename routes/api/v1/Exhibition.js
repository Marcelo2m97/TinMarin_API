const express = require('express');
const router = express.Router();

const ExhibitionController = require('./../../../controllers/api/public/Exhibition');

router.get('/', ExhibitionController.find);
router.get('/:_id', ExhibitionController.findOneById);

module.exports = router;