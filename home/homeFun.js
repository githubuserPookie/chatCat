const ejs = require("ejs");

const renderHome = (req, res) => res.render("../static/home.ejs");

module.exports = {renderHome};
