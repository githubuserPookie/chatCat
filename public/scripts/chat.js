const socket = io();
const form = document.getElementById("form");
const messageHTML = document.getElementById("message");
const messageLogHTML = document.getElementById("messageLog");
const testCurses = false;
// const blockedWords = new Array();

// ----List-Of-Banned-Words---- \\
// 1 = Curse Words, 2 = Banned Symbols/Characters
//hum isnt there a much more efficent way to do this? this seems very innoficent
// blockedWords[blockedWords.length] = new Array("CurseWord", 1);
// blockedWords[blockedWords.length] = new Array("fuck", 1);
// blockedWords[blockedWords.length] = new Array("shit", 1);
// blockedWords[blockedWords.length] = new Array("bitch", 1);
// blockedWords[blockedWords.length] = new Array("b", 2);
//heres a better wat
const blockedWords = [["fuck", 1], ["shit", 1], ["bitch", 1], ["b",2]];
// ---------------------------- \\

const isLoggedIn = fetch("/auth/checkIfLogin", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(async(response) => {
    const theRes = await response.json();
    if (theRes.sucess === "true") {

      const username = theRes.userName;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const messageValue = messageHTML.value;
        const testedMessageValue = TestForWords(messageValue, blockedWords).join(' ');
        const newMessageValue = `<h2>${username}: ${testedMessageValue}</h2>`
        messageHTML.value = "";
        //socket.emit('clientMessage', newMessageValue);
        const uniqueCharacters = new Set(testedMessageValue.split("")).join;
        if (uniqueCharacters.length > 1) {
          socket.emit('clientMessage', TestForWords(newMessageValue, blockedWords).join(' '));
        } else {
          alert("You must have at least 2 different characters in a message.");
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

  function TestForWords (_message, _blockedWords) {
    const messageWordArray = _message.split(" ");

    for (messageIndex = 0; messageIndex < messageWordArray.length; messageIndex++){
      for(let searchWordsIndex = 0; searchWordsIndex < _blockedWords.length; searchWordsIndex++){
        if(messageWordArray[messageIndex] == _blockedWords[searchWordsIndex][0]) {
          switch (_blockedWords[searchWordsIndex][1]) {
            case 1 /* Curse words */:
              messageWordArray[messageIndex] = messageWordArray[messageIndex].charAt(0);
              // Add "*"s after the first letter in
              for (addHashIndex = 0; addHashIndex < (_blockedWords[searchWordsIndex][0].length - 1); addHashIndex++) {
                alert(_blockedWords[searchWordsIndex][0] + ". for loop: " + messageWordArray[messageIndex]);
                messageWordArray[messageIndex] += "*";
              }
              alert(messageWordArray[messageIndex]);
              break;
            case 2 /* Blocked symbols, characters, etc. */:
              messageWordArray[messageIndex] = " ";
              alert("You have used a symbol that is blocked, it has thus been removed.")
              console.log(messageWordArray[messageIndex]);
              break;
            default:
              console.error("Incorrect value imputed for function \"testForWords\" in \"Chat.js\"");
              break;
          }
        }
      }
    }
    return messageWordArray;
  }
  