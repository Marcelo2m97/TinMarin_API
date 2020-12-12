const express = require('express');
const router = express.Router();

const ExhibitionController = require('./../../../controllers/api/Exhibition');

router.post('/', ExhibitionController.addNewExhibition);

module.exports = router;