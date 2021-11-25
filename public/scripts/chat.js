const socket = io();
const form = document.getElementById("form");
const messageHTML = document.getElementById("message");
const messageLogHTML = document.getElementById("messageLog");
const isLoggedIn = fetch("/auth/checkIfLogin", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  } //hi nickholassssssss
})
  .then(async(response) => {
    const theRes = await response.json();
    if (theRes.sucess === "true") {

      const username = theRes.userName;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const messageValue = messageHTML.value;
        const newMessageValue = `<h2>${username}: ${messageValue}</h2>`
        messageHTML.value = "";
        socket.emit('clientMessage', newMessageValue);
      })
      socket.on("message", msg => {
        messageLogHTML.innerHTML = messageLog.innerHTML + msg;
        console.log(msg);
        messageLogHTML.scrollTop = messageLogHTML.scrollHeight;
      })
    }
    else {
      window.location = "/home";
    }
  })
  .catch(err => console.log(err))