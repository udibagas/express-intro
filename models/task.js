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
    const { title, deadline, priority, UserId } = newTask;
    this.validate({ title, deadline, priority, UserId });

    const query = `
      INSERT INTO "Taskss" ("title", "deadline", "priority", "UserId")
      VALUES ($1, $2, $3, $4)
    `;

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
    const { title, deadline, priority, UserId } = data;
    this.validate({ title, deadline, priority, UserId });

    const query = `
      UPDATE "Tasks"
      SET
        "title" = $1,
        "deadline" = $2,
        "priority" = $3,
        "UserId" = $4
      WHERE id = $5
    `;

    await pool.query(query, [title, deadline, priority, UserId, id]);
  }

  static validate({ title, deadline, priority, UserId }) {
    const errors = [];

    if (!title) {
      errors.push("Title is required");
    }

    if (!deadline) {
      errors.push("Deadline is required");
    }

    if (!priority) {
      errors.push("Priority is required");
    }

    if (priority && !["L", "M", "H", "U"].includes(priority)) {
      errors.push(`Invalid priority`);
    }

    if (!UserId) {
      errors.push("PIC is required");
    }

    if (errors.length) {
      const message = errors.join(", ");
      const error = new Error(message);
      error.type = "ValidationError";
      throw error;
    }
  }
}

module.exports = Task;
