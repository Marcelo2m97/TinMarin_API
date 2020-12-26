const express = require('express');
const router = express.Router();

const EducationAreaController = require('./../../../controllers/api/EducationArea');

router.post('/', EducationAreaController.create);
router.get('/', EducationAreaController.findAll);

module.exports = router;