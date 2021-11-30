import { badWords, tempReplaceWords, permReplacedWords, easterEggs, allowedWords } from '../../public/scripts/unvaryingData/blockedWords.js';
import { checkMessage, replaceCharacters, checkCurses } from '../../public/scripts/functions/messageRelated.js';
const socket = io();
const form = document.getElementById("form");
const messageHTML = document.getElementById("message");
const messageLogHTML = document.getElementById("messageLog");
const errorImage = document.querySelector("#errorImg");
const containFormMessageLog = document.getElementById("containFormMessageLog");
errorImage.setAttribute('draggable', false);
errorImage.style.opacity = 0;
const warningImage = document.querySelector("#warningImg");
warningImage.setAttribute('draggable', false);
warningImage.style.opacity = 0;
const cursingImage = document.querySelector("#cursingImg");
cursingImage.setAttribute('draggable', false);
cursingImage.style.opacity = 0;

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
      //will run when a key is pressed
      form.addEventListener("keydown", (event) => {
        setTimeout((event) => {
          let messageValueHTML = messageHTML.value;
          const hasCursed = checkCurses(messageValueHTML);
          const filteredMessageValueHTML = checkMessage(messageValueHTML);
          console.log(hasCursed);
          // Detect if the message contains too few/many characters, to prevent spam.
          if (hasCursed) {
            cursingImage.style.opacity = 1;
          } else {
            cursingImage.style.opacity = 0;
          }

          if (!filteredMessageValueHTML.length) {
            warningImage.style.opacity = 0;
          } else if (filteredMessageValueHTML.length == 0) {
            warningImage.style.opacity = 0;
          } else if (filteredMessageValueHTML.length < 2) {
            warningImage.style.opacity = 1;
          } else if (filteredMessageValueHTML.length > 2000) {
            warningImage.style.opacity = 1;
          } else {
            warningImage.style.opacity = 0;
          }
        }, 50)

      })
      //will run when a message is submitted
      form.addEventListener("submit", (event) => {

        event.preventDefault();//prevent page from reloading

        const messageValueHTML = messageHTML.value;
        messageHTML.value = ""; // reset the input box so its empty
        //can we check for swear words on every key press to add err img?
        const filteredMessageValueHTML = checkMessage(messageValueHTML);//run message threw a filter to reinforce security + prevent spamm and profanity

        const newMessageValueHTML = `<h2>${username}: ${filteredMessageValueHTML}</h2><h5></h5>`;

        // Detect if the message contains too few/many characters, to prevent spam.
        if (!filteredMessageValueHTML.length) {
          errorImage.style.opacity = 1;
          setTimeout(() => { errorImage.style.opacity = 0; }, 1500);
        } else if (filteredMessageValueHTML.length == 0) {
          errorImage.style.opacity = 1;
          setTimeout(() => { errorImage.style.opacity = 0; }, 1500);
        } else if (filteredMessageValueHTML.length < 2) {
          errorImage.style.opacity = 1;
          setTimeout(() => { errorImage.style.opacity = 0; }, 1500);
        } else if (filteredMessageValueHTML.length > 2000) {
          errorImage.style.opacity = 1;
          setTimeout(() => { errorImage.style.opacity = 0; }, 1500);
        } else {

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
        containFormMessageLog.scrollTop = containFormMessageLog.scrollHeight;
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
  containFormMessageLog.scrollTop = containFormMessageLog.scrollHeight;
})
  .catch((err) => {
    console.log(err);
  })