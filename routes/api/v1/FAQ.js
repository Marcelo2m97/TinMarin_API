const express = require('express');
const router = express.Router();

const FAQController = require('./../../../controllers/api/public/FAQ');

router.get('/', FAQController.findAll);

module.exports = router;