"use strict";

const pool = require("../db/connection");

class Task {
  constructor(id, title, deadline, status, priority, UserId, pic) {
    this.id = id;
    this.title = title;
    this.deadline = deadline;
    this.status = status;
    this.priority = priority;
    this.UserId = UserId;
    this.pic = pic;
  }

  get formattedDeadline() {
    return this.deadline.toLocaleString("id-ID", {
      dateStyle: "medium",
    });
  }

  get priorityLabel() {
    const priorities = {
      L: "Low",
      M: "Medium",
      H: "High",
      U: "Urgent",
    };

    return priorities[this.priority];
  }

  get statusLabel() {
    return this.status ? "Done" : "Pending";
  }

  static async findAll(priority) {
    let query = `
      SELECT
        t.*,
        CONCAT_WS(' ', u."firstName", u."lastName") AS "pic"
      FROM "Tasks" t
      JOIN "Users" u ON u.id = t."UserId"
    `;

    if (priority) {
      query += `WHERE priority = '${priority}'`;
    }

    query += ` ORDER BY t."deadline" DESC`;

    const { rows } = await pool.query(query);
    return rows.map((el) => {
      return new Task(
        el.id,
        el.title,
        el.deadline,
        el.status,
        el.priority,
        el.UserId,
        el.pic
      );
    });
  }

  static async insert(newTask) {
    const query = `
      INSERT INTO "Tasks" ("title", "deadline", "priority", "UserId")
      VALUES ($1, $2, $3, $4)
    `;

    const { title, deadline, priority, UserId } = newTask;
    await pool.query(query, [title, deadline, priority, UserId]);
  }

  static async destroyById(id) {
    await pool.query(`DELETE FROM "Tasks" WHERE id = $1`, [id]);
  }

  static async findById(taskId) {
    let query = `
      SELECT
        t.*,
        CONCAT_WS(' ', u."firstName", u."lastName") AS "pic"
      FROM "Tasks" t
      JOIN "Users" u ON u.id = t."UserId"
      WHERE t.id = $1
    `;

    const { rows } = await pool.query(query, [taskId]);
    const { id, title, deadline, status, priority, UserId, pic } = rows[0];
    return new Task(id, title, deadline, status, priority, UserId, pic);
  }

  static async updateById(id, data) {
    const query = `
      UPDATE "Tasks"
      SET
        "title" = $1,
        "deadline" = $2,
        "priority" = $3,
        "UserId" = $4
      WHERE id = $5
    `;

    const { title, deadline, priority, UserId } = data;
    await pool.query(query, [title, deadline, priority, UserId, id]);
  }
}

module.exports = Task;
