const Category = require("../models/category");
const Menu = require("../models/menu");

class Controller {
  static async menus(req, res) {
    try {
      const menus = await Menu.findAll();
      console.log(menus);
      res.render("menus", { menus });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async addMenu(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("addMenu", { categories });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async saveMenu(req, res) {
    try {
      await Menu.create(req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async deleteMenu(req, res) {
    const { id } = req.params;
    try {
      await Menu.destroy(id);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async editMenu(req, res) {
    const { id } = req.params;

    try {
      const categories = await Category.findAll();
      const menu = await Menu.findById(id);
      res.render("editMenu", { categories, menu });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async updateMenu(req, res) {
    const { id } = req.params;

    try {
      await Menu.update(id, req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = Controller;
