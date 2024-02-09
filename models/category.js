const pool = require("../db/connection");

class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async findAll() {
    const query = `SELECT * FROM "Categories" ORDER BY "name" ASC`;
    const { rows } = await pool.query(query);
    return rows.map((el) => new Category(el.id, el.name));
  }
}

module.exports = Category;
