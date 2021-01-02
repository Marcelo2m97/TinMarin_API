const express = require('express');
const router = express.Router();

const ExhibitionRoomController = require('./../../../controllers/api/ExhibitionRoom');

router.post('/', ExhibitionRoomController.create);

module.exports = router;