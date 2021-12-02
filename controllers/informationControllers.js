const ejs = require("ejs");

const renderInformation = (req, res) => {
  if(req.session.userName){
    const userName = req.session.userName;
  }
  else{
    console.log("username not found");
  }
  res.render("../views/information.ejs");
  };
module.exports = {renderInformation};
