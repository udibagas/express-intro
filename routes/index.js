const { getMenus, home, categories } = require("../controllers");
const router = require("express").Router();

router.get("/", home);
router.get("/categories", categories);
router.use("/menus", require("./menus"));

module.exports = router;
