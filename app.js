const express = require("express");
const router = require("./routes");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // req.body
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
