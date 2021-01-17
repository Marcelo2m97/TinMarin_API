const express = require('express');
const router = express.Router();

const ExhibitionRoomController = require('./../../../controllers/api/public/ExhibitionRoom');

router.post('/', ExhibitionRoomController.create);
router.get('/', ExhibitionRoomController.find);

module.exports = router;