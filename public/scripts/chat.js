import {blockedWords, allowedWords} from '../../public/scripts/unvaryingData/blockedWords.js';
import {checkMessage} from '../../public/scripts/functions/messageRelated.js';
const socket = io();
const form = document.getElementById("form");
const messageHTML = document.getElementById("message");
const messageLogHTML = document.getElementById("messageLog");

const isLoggedIn = fetch("/auth/checkIfLogin", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(async (response) => {
    const theRes = await response.json();
    if (theRes.sucess === "true") {
      const username = theRes.userName;

      //will run when new message is submited
      form.addEventListener("submit", (event) => {
        
        event.preventDefault();//prevent page from reloading

        //
        const messageValueHTML = messageHTML.value;
        messageHTML.value = "";//reset the input box so its empty

        const filteredMessageValueHTML = checkMessage(messageValueHTML);//run message threw a filter to reinforce security + prevent spamm and profanity

        const newMessageValueHTML= `<h2>${username}: ${filteredMessageValueHTML}</h2><h5></h5>`;

        // Detect if the message contains too few/many characters, to prevent spam.
        if (filteredMessageValueHTML.length == null) { } else
          if (filteredMessageValueHTML.length < 2) { alert("Minimum message size: 2") } else
            if (filteredMessageValueHTML.length > 2000) { alert("Maximum message size: 2000") } else {
              socket.emit('clientMessage', newMessageValueHTML);
              const addMessageToDb = fetch("/chat/addMessage", {
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                  message: newMessageValueHTML
                })
              })
            }
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



const fetchChatData = fetch("/chat/loadData", {
    method: 'GET',
  }).then(async (resultFetchData) => {
    //if (performance.navigation.type == performance.navigation.TYPE)
    const theResFetch = await resultFetchData.json();
    let messagesFetch = theResFetch.messages;
    messagesFetch = messagesFetch.toString();
    messagesFetch = messagesFetch.replace(/,/g, "");
    messageLogHTML.innerHTML = messagesFetch;
    console.log(messagesFetch);
    messageLogHTML.scrollTop = messageLogHTML.scrollHeight;
  })
    .catch((err) => {
      console.log(err);
  })