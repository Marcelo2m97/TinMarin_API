const express = require('express');
const router = express.Router();

const EducationAreaController = require('./../../../controllers/api/private/EducationArea');

router.post('/', EducationAreaController.create);
router.delete('/:_id', EducationAreaController.remove);

module.exports = router;