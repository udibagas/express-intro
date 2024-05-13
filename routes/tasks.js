const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.get("/", Controller.tasks);
router.get("/add", Controller.addTask);
router.post("/add", Controller.saveTask);
router.get("/:id", Controller.task);
router.get("/edit/:id", Controller.editTask);
router.post("/edit/:id", Controller.updateTask);
router.get("/delete/:id", Controller.deleteTask);

module.exports = router;
