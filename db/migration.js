const fs = require("fs");
const pool = require("./connection");

pool
  .query(fs.readFileSync("./db/schema.sql", "utf-8"))
  .then(() => {
    console.log(`Success create schema!`);
  })
  .catch((e) => console.log(e.message));
