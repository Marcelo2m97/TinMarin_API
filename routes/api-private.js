const express = require("express");
const router = express.Router();

const V1Router = require('./api/v1-private');

router.use("/v1/private", V1Router);

module.exports = router;