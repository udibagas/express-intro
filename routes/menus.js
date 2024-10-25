const { getMenuById } = require("../controllers");
const router = require("express").Router();

router.get("/:id", getMenuById);

module.exports = router;
