const socket = io();
const form = document.getElementById("form");
const messageHTML = document.getElementById("message");
const messageLogHTML = document.getElementById("messageLog");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const messageValue = messageHTML.value;
    messageHTML.value = "";
    socket.emit('clientMessage', messageValue);
})

socket.on("message", msg => {
    messageLogHTML.innerHTML = messageLogHTML.innerHTML + "<h2>" + msg + "</h2>";
    console.log(msg);
    messageLogHTML.scrollTop = messageLogHTML.scrollHeight;
})