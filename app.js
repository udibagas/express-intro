const express = require("express"); // import
const app = express(); // create instance
const port = 3000;
const router = require("./routes");

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
