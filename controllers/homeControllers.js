const ejs = require("ejs");

const renderHome = (req, res) => res.render("../public/home.ejs");

module.exports = {renderHome};
