const express = require('express');
const router = express.Router();

const ExhibitionRouter = require('./v1/Exhibition');
const SuggestionTypeRouter = require('./v1/SuggestionType');

router.use('/exhibitions', ExhibitionRouter);
router.use('/suggestiontypes', SuggestionTypeRouter);

module.exports = router;