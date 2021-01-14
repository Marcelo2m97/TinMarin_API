const express = require('express');
const router = express.Router();

const ExhibitionController = require('./../../../controllers/api/Exhibition');

router.post('/', ExhibitionController.addNewExhibition);
router.get('/', ExhibitionController.find);
router.get('/:_id', ExhibitionController.findOneById);
router.delete('/:_id', ExhibitionController.remove);

module.exports = router;