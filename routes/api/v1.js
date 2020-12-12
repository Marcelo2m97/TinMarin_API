const express = require("express");
const router = express.Router();

const ExhibitionRouter = require('./v1/Exhibition');

router.use("/exhibition", ExhibitionRouter);

module.exports = router;