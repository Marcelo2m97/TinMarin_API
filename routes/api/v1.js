const express = require('express');
const router = express.Router();

const ExhibitionRouter = require('./v1/Exhibition');
const SuggestionTypeRouter = require('./v1/SuggestionType');
const SuggestionRouter = require('./v1/Suggestion');
const RecommendationRouter = require('./v1/Recommendation');

router.use('/exhibitions', ExhibitionRouter);
router.use('/suggestiontypes', SuggestionTypeRouter);
router.use('/suggestions', SuggestionRouter);
router.use('/recommendations', RecommendationRouter);

module.exports = router;