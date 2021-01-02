const express = require('express');
const router = express.Router();

const EducationArea =require('./v1/EducationArea');
const ExhibitionRouter = require('./v1/Exhibition');
const ExhibitionRoomRouter = require('./v1/ExhibitionRoom');
const FAQRouter = require('./v1/FAQ');
const RecommendationRouter = require('./v1/Recommendation');
const RecommendedWebsiteRouter = require('./v1/RecommendedWebsite');
const SuggestionTypeRouter = require('./v1/SuggestionType');
const SuggestionRouter = require('./v1/Suggestion');

router.use('/education-areas', EducationArea);
router.use('/exhibitions', ExhibitionRouter);
router.use('/exhibition-rooms', ExhibitionRoomRouter);
router.use('/faqs', FAQRouter);
router.use('/recommendations', RecommendationRouter);
router.use('/recommended-websites', RecommendedWebsiteRouter);
router.use('/suggestiontypes', SuggestionTypeRouter);
router.use('/suggestions', SuggestionRouter);

module.exports = router;