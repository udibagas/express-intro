const { getMenus } = require("../controllers");
const router = require("express").Router();

router.get("/", getMenus);
router.use("/menus", require("./menus"));

module.exports = router;
