const fs = require("fs");
const pool = require("./connection");

const categories = JSON.parse(fs.readFileSync("./data/categories.json"))
  .map((el) => {
    return `('${el.name}')`;
  })
  .join(",\n");

const queryCategories = `
  INSERT INTO "Categories" ("name")
  VALUES ${categories}
  RETURNING *
`;

const menus = JSON.parse(fs.readFileSync("./data/menus.json"))
  .map((el) => {
    return `('${el.name}', '${el.CategoryId}', '${el.stock}', '${el.price}', '${el.createdAt}')`;
  })
  .join(",\n");

const queryMenus = `
  INSERT INTO "Menus" ("name", "CategoryId", "stock", "price", "createdAt")
  VALUES ${menus}
  RETURNING *
`;

(async () => {
  try {
    const { rows } = await pool.query(queryCategories);
    console.table(rows);
    const { rows: menus } = await pool.query(queryMenus);
    console.table(menus);
  } catch (error) {
    console.error(error.message);
  }
})();
