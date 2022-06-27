const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const indexController = require("../controller/index");

router.get("/", indexController.home);

router.get("/s1", indexController.s1);

router.get("/s2", indexController.s2);

router.get("/s3", indexController.s3);

// http://localhost:8000/s4?file=seoul.mp3
router.get("/s4", indexController.s4_GET);

router.get("/s4/upload", indexController.s4_upload);

router.post("/s4", indexController.s4_POST);

module.exports = router;
