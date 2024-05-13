"use strict";

const Task = require("../models/task");
const User = require("../models/user");

class Controller {
  static home(req, res) {
    res.render("home");
  }

  static async users(req, res) {
    try {
      const users = await User.findAll();
      res.render("users", { users });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async tasks(req, res) {
    const { priority } = req.query;

    try {
      const tasks = await Task.findAll(priority);
      res.render("tasks", { tasks });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static task(req, res) {
    try {
      res.send("Task by id");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async addTask(req, res) {
    let { error } = req.query;

    if (error) {
      error = error.split(", ");
    }

    try {
      const users = await User.findAll();
      res.render("addTask", { users, error });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async saveTask(req, res) {
    try {
      await Task.insert(req.body);
      res.redirect("/tasks");
    } catch (error) {
      console.log(error);
      if (error.type == "ValidationError") {
        res.redirect(`/tasks/add?error=${error.message}`);
      } else {
        res.render("error", { error });
      }
    }
  }

  static async editTask(req, res) {
    let { error } = req.query;

    if (error) {
      error = error.split(", ");
    }

    try {
      const task = await Task.findById(req.params.id);
      const users = await User.findAll();
      res.render("editTask", { users, task, error });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async updateTask(req, res) {
    const { id } = req.params;
    try {
      await Task.updateById(id, req.body);
      res.redirect("/tasks");
    } catch (error) {
      console.log(error);
      if (error.type == "ValidationError") {
        res.redirect(`/tasks/edit/${id}?error=${error.message}`);
      } else {
        res.render("error", { error });
      }
    }
  }

  static async deleteTask(req, res) {
    try {
      await Task.destroyById(req.params.id);
      res.redirect("/tasks");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = Controller;
