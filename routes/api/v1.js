const express = require("express");
const router = express.Router();

const ExhibitionRouter = require('./v1/Exhibition');

router.use("/exhibitions", ExhibitionRouter);

module.exports = router;