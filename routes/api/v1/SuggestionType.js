const express = require('express');
const router = express.Router();

const SuggestionTypeController = require('./../../../controllers/api/SuggestionType');

router.post('/', SuggestionTypeController.create);
router.get('/', SuggestionTypeController.findAll);

module.exports = router;