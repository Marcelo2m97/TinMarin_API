const express = require('express');
const router = express.Router();

const ExhibitionController = require('./../../../controllers/api/Exhibition');

router.post('/', ExhibitionController.addNewExhibition);
router.get('/', ExhibitionController.findAll);
router.get('/:_id', ExhibitionController.findOneById);

module.exports = router;