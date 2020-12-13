const express = require('express');
const router = express.Router();

const SuggestionController = require('./../../../controllers/api/Suggestion');

router.post('/', SuggestionController.create);

module.exports = router;