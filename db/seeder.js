const fs = require("fs");
const pool = require("./connection");

const categories = JSON.parse(
  fs.readFileSync("./data/categories.json", "utf-8")
)
  .map((el) => {
    return `('${el.name}')`;
  })
  .join(",\n");

const menus = JSON.parse(fs.readFileSync("./data/menus.json", "utf-8"))
  .map((el) => {
    return `('${el.name}', ${el.CategoryId}, ${el.stock}, ${el.price}, '${el.createdAt}')`;
  })
  .join(",\n");

const insertCategoriesQuery = `
  INSERT INTO "Categories" ("name")
  VALUES
    ${categories}
  RETURNING *
`;

const insertMenusQuery = `
  INSERT INTO "Menus" ("name", "CategoryId", "stock", "price", "createdAt")
  VALUES
    ${menus}
  RETURNING *
`;

(async () => {
  try {
    const { rows } = await pool.query(insertCategoriesQuery);
    const { rows: menus } = await pool.query(insertMenusQuery);
    console.table(rows);
    console.table(menus);
  } catch (error) {
    console.log(error);
  }
})();
