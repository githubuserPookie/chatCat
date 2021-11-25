const ejs = require("ejs");

const renderHome = (req, res) => {
  if(req.session.userName){
    const userName = req.session.userName;
  }
  else{
    console.log("username not found");
  }
  res.render("../views/home.ejs");
  };
module.exports = {renderHome};
