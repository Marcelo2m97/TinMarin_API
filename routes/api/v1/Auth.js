const express = require('express');
const router = express.Router();

const AuthController = require('../../../controllers/api/public/Auth');

router.post('/login', AuthController.login);

module.exports = router;