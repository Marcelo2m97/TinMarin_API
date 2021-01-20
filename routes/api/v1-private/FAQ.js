const express = require('express');
const router = express.Router();

const FAQController = require('./../../../controllers/api/private/FAQ');

router.post('/', FAQController.create);
router.put('/:_id', FAQController.update);
router.delete('/:_id', FAQController.remove);

module.exports = router;