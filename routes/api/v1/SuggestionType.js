const express = require('express');
const router = express.Router();

const SuggestionTypeController = require('./../../../controllers/api/public/SuggestionType');

router.get('/', SuggestionTypeController.findAll);

module.exports = router;