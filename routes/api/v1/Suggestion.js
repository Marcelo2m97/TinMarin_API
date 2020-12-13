const express = require('express');
const router = express.Router();

const SuggestionController = require('./../../../controllers/api/Suggestion');

router.post('/', SuggestionController.create);
router.get('/', SuggestionController.findAll);

module.exports = router;