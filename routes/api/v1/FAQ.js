const express = require('express');
const router = express.Router();

const FAQController = require('./../../../controllers/api/FAQ');

router.post('/', FAQController.create);
router.get('/', FAQController.findAll);
router.delete('/:_id', FAQController.remove);

module.exports = router;