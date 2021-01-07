const express = require('express');
const router = express.Router();

const EducationAreaController = require('./../../../controllers/api/EducationArea');

router.post('/', EducationAreaController.create);
router.get('/', EducationAreaController.findAll);
router.delete('/:_id', EducationAreaController.remove);

module.exports = router;