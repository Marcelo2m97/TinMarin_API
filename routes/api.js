const express = require("express");
const router = express.Router();

const V1Router = require('./api/v1');

router.use("/v1", V1Router);

module.exports = router;