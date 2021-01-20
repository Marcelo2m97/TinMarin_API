const express = require('express');
const router = express.Router();

const ExhibitionController = require('./../../../controllers/api/private/Exhibition');

router.post('/', ExhibitionController.addNewExhibition);
router.put('/:_id', ExhibitionController.update);
router.delete('/:_id', ExhibitionController.remove);

module.exports = router;