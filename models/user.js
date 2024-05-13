"use strict";

const pool = require("../db/connection");

class User {
  constructor(id, firstName, lastName, email, gender) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get genderLabel() {
    return this.gender == "M" ? "Male" : "Female";
  }

  static bulkCreate(rows) {
    return rows.map((el) => {
      const { id, firstName, lastName, email, gender } = el;
      return new User(id, firstName, lastName, email, gender);
    });
  }

  static async findAll() {
    const query = `SELECT * FROM "Users" ORDER BY "firstName" ASC, "lastName" ASC`;
    const { rows } = await pool.query(query);
    return this.bulkCreate(rows);
  }
}

module.exports = User;
