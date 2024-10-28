const Category = require("../models/category");
const Menu = require("../models/menu");
const fs = require("fs");

exports.home = (req, res) => {
  res.render("home");
};

exports.getMenus = async (req, res) => {
  const { keyword, error } = req.query;

  try {
    const menus = await Menu.findAll(keyword);
    res.render("menus", { menus, error });
  } catch (error) {
    res.send(error.message);
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.render("menu", { menu });
  } catch (error) {
    res.send(error.message);
  }
};

exports.addMenu = async (req, res) => {
  let { errors } = req.query;
  if (errors) errors = errors.split(",");

  try {
    const categories = await Category.findAll();
    res.render("addMenu", { categories, errors });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.createMenu = async (req, res) => {
  try {
    await Menu.create(req.body);
    res.redirect("/menus");
  } catch (error) {
    console.log(error);

    if (error.name == "ValidationError") {
      res.redirect(`/menus/add?errors=${error.message}`);
    } else {
      // res.send(error.message);
      res.render("error", { error });
    }
  }
};

exports.editMenu = async (req, res) => {
  let { errors } = req.query;
  if (errors) errors = errors.split(",");

  try {
    const menu = await Menu.findById(req.params.id);
    const categories = await Category.findAll();
    res.render("editMenu", { categories, menu, errors });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.updateMenu = async (req, res) => {
  const { id } = req.params;

  try {
    await Menu.update(id, req.body);
    res.redirect("/menus");
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      res.redirect(`/menus/edit/${id}?errors=${error.message}`);
    } else {
      // res.send(err.message);
      res.render("error", { error });
    }
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    await Menu.remove(req.params.id);
    res.redirect("/menus");
  } catch (error) {
    console.log(error);

    if (error.name == "ValidationError") {
      res.redirect(`/menus?error=${error.message}`);
    } else {
      res.send(error.message);
    }
  }
};

exports.categories = (req, res) => {
  res.render("categories");
};
