const Category = require("../models/category");
const Menu = require("../models/menu");
const fs = require("fs");

exports.getMenus = async (req, res) => {
  const { keyword } = req.query;

  try {
    const menus = await Menu.findAll(keyword);
    res.render("menus", { menus });
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
  try {
    const categories = await Category.findAll();
    res.render("addMenu", { categories });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.createMenu = async (req, res) => {
  try {
    await Menu.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.editMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    const categories = await Category.findAll();
    res.render("editMenu", { categories, menu });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.updateMenu = async (req, res) => {
  try {
    await Menu.update(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    await Menu.remove(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
