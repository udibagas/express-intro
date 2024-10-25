const Menu = require("../models/menu");

exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.send(menus);
  } catch (error) {
    res.send(error.message);
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.send(menu);
  } catch (error) {
    res.send(error.message);
  }
};
