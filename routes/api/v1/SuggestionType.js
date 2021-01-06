const express = require('express');
const router = express.Router();

const SuggestionTypeController = require('./../../../controllers/api/SuggestionType');

router.post('/', SuggestionTypeController.create);
router.get('/', SuggestionTypeController.findAll);
router.delete('/:_id', SuggestionTypeController.remove);

module.exports = router;