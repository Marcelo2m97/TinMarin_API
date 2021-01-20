const express = require('express');
const router = express.Router();

const SuggestionTypeController = require('./../../../controllers/api/private/SuggestionType');

router.post('/', SuggestionTypeController.create);
router.put('/:_id', SuggestionTypeController.update);
router.delete('/:_id', SuggestionTypeController.remove);

module.exports = router;