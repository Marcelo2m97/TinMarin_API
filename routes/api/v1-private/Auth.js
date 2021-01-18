const express = require('express');
const router = express.Router();

const AuthController = require('../../../controllers/api/private/Auth');

router.post('/register', AuthController.register);

module.exports = router;