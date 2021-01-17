const express = require('express');
const router = express.Router();

const EducationAreaController = require('./../../../controllers/api/public/EducationArea');

router.get('/', EducationAreaController.findAll);

module.exports = router;