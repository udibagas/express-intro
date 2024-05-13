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
    try {
      const users = await User.findAll();
      res.render("addTask", { users });
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
      res.send(error.message);
    }
  }

  static async editTask(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      const users = await User.findAll();
      res.render("editTask", { users, task });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async updateTask(req, res) {
    try {
      await Task.updateById(req.params.id, req.body);
      res.redirect("/tasks");
    } catch (error) {
      console.log(error);
      res.send(error.message);
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
