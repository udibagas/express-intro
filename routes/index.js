const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/", Controller.home);
router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));

module.exports = router;
