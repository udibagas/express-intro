const {
  getMenuById,
  addMenu,
  createMenu,
  editMenu,
  updateMenu,
  deleteMenu,
  getMenus,
} = require("../controllers");
const router = require("express").Router();

router.get("/", getMenus);
router.get("/add", addMenu);
router.post("/add", createMenu);
router.get("/:id", getMenuById);
router.get("/edit/:id", editMenu);
router.post("/edit/:id", updateMenu);
router.get("/delete/:id", deleteMenu);

module.exports = router;
