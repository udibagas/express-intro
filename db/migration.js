const pool = require("./connection");

const categoriesDDL = `
  CREATE TABLE IF NOT EXISTS "Categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30) NOT NULL UNIQUE
  )
`;

const menusDDL = `
  CREATE TABLE IF NOT EXISTS "Menus" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "stock" INT NOT NULL,
    "price" INT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CategoryId" INT NOT NULL REFERENCES "Categories" ("id")
      ON UPDATE CASCADE
      ON DELETE CASCADE
  )
`;

(async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS "Menus", "Categories"`);
    await pool.query(categoriesDDL);
    await pool.query(menusDDL);
    console.log("Migration success!");
  } catch (error) {
    console.log(error.message);
  }
})();
