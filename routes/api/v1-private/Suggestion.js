const express = require('express');
const router = express.Router();

const SuggestionController = require('./../../../controllers/api/private/Suggestion');

router.get('/', SuggestionController.findAll);
router.delete('/:_id', SuggestionController.remove);

module.exports = router;