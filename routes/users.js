const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.get("/", Controller.users);

module.exports = router;
