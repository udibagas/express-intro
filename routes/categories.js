const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("All categories");
});

router.get("/add", (req, res) => {
  res.send("Add categories");
});

router.get("/:productName", (req, res) => {
  res.send("Single categories");
});

module.exports = router;
