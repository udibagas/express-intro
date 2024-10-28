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

  static async findById(menuId) {
    const query = `
      SELECT
        m.*,
        c.name AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."CategoryId"
      WHERE m.id = $1
    `;

    const { rows, rowCount } = await pool.query(query, [menuId]);

    if (rowCount == 0) {
      throw new Error("Data not found");
    }

    const { id, name, CategoryId, stock, price, createdAt, category } = rows[0];
    return new Menu(id, name, CategoryId, stock, price, createdAt, category);
  }

  //   {
  //   name: 'Ayam Bakar',
  //   CategoryId: '2',
  //   stock: '10',
  //   price: '50000',
  //   createdAt: '2024-10-25'
  // }
  static create(data) {
    this.validate(data);

    const query = `
      INSERT INTO "Menus" ("name", "CategoryId", "stock", "price", "createdAt")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const { name, CategoryId, stock, price, createdAt } = data;
    return pool.query(query, [name, CategoryId, stock, price, createdAt]);
  }

  static update(id, data) {
    this.validate(data);

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

  static async remove(id) {
    const menu = await this.findById(id);

    if (menu.stock >= 20) {
      const error = new Error("Menu masih banyak. Ga boleh dihapus");
      error.name = "ValidationError";
      throw error;
    }

    await pool.query(`DELETE FROM "Menus" WHERE id = $1`, [id]);
  }

  static validate(data) {
    const { name, CategoryId, stock, price, createdAt } = data;

    const errors = [];

    if (!name) {
      errors.push("Name is required");
    }

    if (!CategoryId) {
      errors.push("Category is required");
    }

    if (!stock) {
      errors.push("Stock is required");
    }

    if (!price) {
      errors.push("Price is required");
    }

    if (!createdAt) {
      errors.push("Created At is required");
    }

    if (errors.length > 0) {
      const error = new Error(errors);
      error.name = "ValidationError";
      throw error;
    }

    return true; // optional
  }
}

module.exports = Menu;
