const express = require('express');
const router = express.Router();

const ExhibitionRoomController = require('./../../../controllers/api/private/ExhibitionRoom');

router.delete('/:_id', ExhibitionRoomController.remove);

module.exports = router;