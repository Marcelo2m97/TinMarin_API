const express = require('express');
const router = express.Router();

const SuggestionController = require('./../../../controllers/api/public/Suggestion');

router.post('/', SuggestionController.create);

module.exports = router;