//const menueImgHTML = document.getElementById("menueImg");
const middleSectionLoggedIn = document.getElementById("middleSectionLoggedIn");
const middelSectionHTML = document.querySelector("#middleSectionHTML")
const publicChatHTML = document.getElementById("publicRoom");
const logout = document.getElementById("Logout");
const profile = document.getElementById("Profile");
const registerHTML = document.getElementById("Register");
const loginHTML = document.getElementById("Login")
const isLoggedIn = await fetch("/auth/checkIfLogin", {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(async(response) => {
      const theRes = await response.json();
      if(theRes.sucess === "true"){
        middleSectionLoggedIn.style.display = "block";
        middelSectionHTML.style.display = "none";
        //show home page for logged in users
        profile.style.display = "block";
        logout.style.display = "block";
        registerHTML.style.display = "none";
        loginHTML.style.display = "none";
        publicChatHTML.style.display = "block";
        console.log("I am logged in");
      }
      else{
        //show the home page for non-logged in users
        middleSectionLoggedIn.style.display = "none";
        middelSectionHTML.style.display = "block";
          publicChatHTML.style.display = "none";
          profile.style.display = "none";
          logout.style.display = "none";
          registerHTML.style.display = "block";
          loginHTML.style.display = "block";
          //menueImgHTML.style.display = "none";
          console.log("not logged in")
      }
  })
  .catch(err => console.log(err))
// const logoutFun = () => {await fetch("/auth/logout", {
//   method: 'GET',
//   headers: {
//     'content-Type': 'application/json',
//   }
// })}