const pool = require("../db/connection");

class Menu {
  constructor(id, name, CategoryId, stock, price, createdAt, category) {
    this.id = id;
    this.name = name;
    this.CategoryId = CategoryId;
    this.stock = stock;
    this.price = price;
    this.createdAt = createdAt;
    this.category = category;
  }

  static async findAll() {
    const query = `
      SELECT
        m.*,
        c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
      ORDER BY m.name ASC
    `;

    const { rows } = await pool.query(query);

    return rows.map((el) => {
      const { id, name, CategoryId, stock, price, createdAt, category } = el;
      return new Menu(id, name, CategoryId, stock, price, createdAt, category);
    });
  }

  static async findById(id) {
    const query = `
      SELECT
        m.*,
        c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
      WHERE m.id = ${id}
    `;

    const { rows } = await pool.query(query);

    return rows.map((el) => {
      const { id, name, CategoryId, stock, price, createdAt, category } = el;
      return new Menu(id, name, CategoryId, stock, price, createdAt, category);
    })[0];
  }
}

module.exports = Menu;
