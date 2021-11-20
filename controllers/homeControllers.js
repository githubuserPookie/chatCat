const ejs = require("ejs");

const renderHome = (req, res) => res.render("../views/home.ejs");

module.exports = {renderHome};
