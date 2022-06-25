const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const indexController = require("../controller/index");

router.get("/", indexController.home);

module.exports = router;
