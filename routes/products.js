const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("All Products");
});

router.get("/add", (req, res) => {
  res.send("Add Products");
});

router.get("/:productName", (req, res) => {
  res.send("Single Products");
});

module.exports = router;
