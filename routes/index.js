const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const indexController = require("../controller/index");

router.get("/", indexController.home);

router.get("/s1", indexController.s1);

router.get("/s2", indexController.s2);

router.get("/s3", indexController.s3);

module.exports = router;
