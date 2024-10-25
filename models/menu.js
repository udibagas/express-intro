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

  getFormattedDate() {
    return this.createdAt.toLocaleString("id-ID", {
      dateStyle: "medium",
    });
  }

  static async findAll(keyword) {
    let query = `
      SELECT
        m.*,
        c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
    `;

    if (keyword) {
      query += `WHERE m.name ILIKE '%${keyword}%'`;
    }

    query += ` ORDER BY m.name ASC`;

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
      WHERE m.id = $1
    `;

    const { rows, rowCount } = await pool.query(query, [id]);

    if (rowCount == 0) {
      throw new Error("Data not found");
    }

    return rows.map((el) => {
      const { id, name, CategoryId, stock, price, createdAt, category } = el;
      return new Menu(id, name, CategoryId, stock, price, createdAt, category);
    })[0];
  }

  //   {
  //   name: 'Ayam Bakar',
  //   CategoryId: '2',
  //   stock: '10',
  //   price: '50000',
  //   createdAt: '2024-10-25'
  // }
  static create(data) {
    const query = `
      INSERT INTO "Menus" ("name", "CategoryId", "stock", "price", "createdAt")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const { name, CategoryId, stock, price, createdAt } = data;
    return pool.query(query, [name, CategoryId, stock, price, createdAt]);
  }

  static update(id, data) {
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
    const { name, CategoryId, stock, price, createdAt } = data;
    return pool.query(query, [name, CategoryId, stock, price, createdAt, id]);
  }

  static remove(id) {
    return pool.query(`DELETE FROM "Menus" WHERE id = $1`, [id]);
  }
}

module.exports = Menu;
