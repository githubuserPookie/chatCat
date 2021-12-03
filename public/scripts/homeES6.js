//const menueImgHTML = document.getElementById("menueImg");
const searchForGroopInputHTML = document.getElementById("searchForGroopInput");
const exitSearchHTML = document.getElementById("exitSearch");
const submitSearchHTML = document.getElementById("submitSearch");
const searchForGroopHTML = document.getElementById("searchForGroop");
const menuBtn = document.querySelector(".menu-btn");
const dropDownContent = document.querySelector(".dropDownContent");
const addFriendHTML = document.getElementById("addFriend");
const addServerHTML = document.getElementById("addServer");
// dropDownContent.addEventListener("mouseleave", () => {
//   dropDownContent.style.display = "none";
// })
const searchFormHTML = document.getElementById("searchForm");
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
        profile.style.display = "flex";
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

let menuOpen = false;
menuBtn.addEventListener('click', (event) => {
  if(!menuOpen) {
    dropDownContent.style.height = "215px";
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    dropDownContent.style.height = "0px";
    menuOpen = false;
  }
});// 

let isAddingServer;

const fetchAddChat = (serverOrPrivate, requestInput) => {
  fetch(`/add/${serverOrPrivate}/${requestInput}`)
    .then((fetchRes) => {
      if(fetchRes.status == 200){
        alert("request sent");
      }
      else {
        alert("not found");
      }
    })
    .catch((err) => alert("not found"))
}

let valueSearch;

addFriendHTML.addEventListener("click", (event) => {
  isAddingServer = false;
  searchForGroopHTML.style.display = "block";
  searchForGroopHTML.classList.add("popUp");
  searchForGroopInputHTML.placeholder = "Enter friend username";
})

addServerHTML.addEventListener("click", (event) => {
  isAddingServer = true;
  searchForGroopInputHTML.value = "";
  searchForGroopHTML.style.display = "block";
  searchForGroopHTML.classList.add("popUp");
  searchForGroopInputHTML.placeholder = "Enter Groop name";
});

exitSearchHTML.addEventListener("click", (event) => {
  searchForGroopHTML.style.display = "none";
  searchForGroopHTML.classList.remove("popUp");
});

let submited = false;

const isSubmited = () => {
  if(submited){
    submited = false;
    return true;
  }
  else{
    return false;
  }
}

searchFormHTML.addEventListener("submit", (event) => {
  event.preventDefault();
  submited = true;
  searchForGroopHTML.style.display = "none";
  searchForGroopHTML.classList.remove("popUp");
  if(isSubmited()){
    if(isAddingServer){
      valueSearch = searchForGroopInputHTML.value;
      fetchAddChat("server", valueSearch);
      searchForGroopInputHTML.value = "";
    }
    else{
      valueSearch = searchForGroopInputHTML.value;
      fetchAddChat("private", valueSearch);
      searchForGroopInputHTML.value = "";
    }
  }
});