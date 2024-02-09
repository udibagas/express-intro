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

  get priceInRupiah() {
    return this.price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }

  formattedCreatedAt() {
    return this.createdAt.toLocaleString("id-ID", {
      dateStyle: "medium",
    });
  }

  static async findAll() {
    const query = `
      SELECT
        m.*,
        c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
    `;

    const { rows } = await pool.query(query);
    return rows.map((el) => {
      const { id, name, CategoryId, stock, price, createdAt, category } = el;
      return new Menu(id, name, CategoryId, stock, price, createdAt, category);
    });
  }

  static async findById(menuId) {
    const query = `
      SELECT
        m.*,
        c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
      WHERE m.id = ${menuId}
    `;

    const { rows } = await pool.query(query);
    const { id, name, CategoryId, stock, price, createdAt, category } = rows[0];
    return new Menu(id, name, CategoryId, stock, price, createdAt, category);
  }

  static async create({ name, CategoryId, stock, price, createdAt }) {
    const query = `
      INSERT INTO "Menus" ("name", "CategoryId", "stock", "price", "createdAt")
      VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(query, [name, CategoryId, stock, price, createdAt]);
  }

  static async destroy(id) {
    await pool.query(`DELETE FROM "Menus" WHERE id = ${id}`);
  }

  static async update(id, { name, CategoryId, stock, price, createdAt }) {
    const query = `
      UPDATE "Menus"
      SET
        "name" = $1,
        "CategoryId" = $2,
        "stock" = $3,
        "price" = $4,
        "createdAt" = $5
      WHERE id = $6
    `;

    await pool.query(query, [name, CategoryId, stock, price, createdAt, id]);
  }
}

module.exports = Menu;
