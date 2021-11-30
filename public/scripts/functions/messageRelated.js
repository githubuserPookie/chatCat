import { badWords, tempReplaceWords, permReplacedWords, easterEggs, allowedWords } from '../../../public/scripts/unvaryingData/blockedWords.js';
function checkMessage(message) {
  // Turn the message string into an array
  let permIndex = 100;
  let permReplacedMessage = replaceCharacters(message, permReplacedWords);
  let lastPermReplacedMessage;
  while (permReplacedMessage != lastPermReplacedMessage && permIndex > 0) {
    lastPermReplacedMessage = permReplacedMessage;
    permReplacedMessage = replaceCharacters(permReplacedMessage, permReplacedWords);
    permIndex--;
  }
  let messageArray = permReplacedMessage.split(" ");
  let internalIndex = 100;
  let internalMessageArray = replaceCharacters(permReplacedMessage, tempReplaceWords);
  let lastInternalMessageArray;
  while (internalMessageArray != lastInternalMessageArray && internalIndex > 0) {
    lastInternalMessageArray = internalMessageArray;
    internalMessageArray = replaceCharacters(internalMessageArray, tempReplaceWords);
    internalIndex--;
  }
  internalMessageArray = replaceCharacters(internalMessageArray, tempReplaceWords).split(" ");
  let filteredMessage = "You just found a bug";

  let easterEgg = null;
  for (let easterEggsIndex = 0; easterEggsIndex < easterEggs.length; easterEggsIndex++) {
    if (message == easterEggs[easterEggsIndex][0]) {
      easterEgg = easterEggs[easterEggsIndex][1];
      filteredMessage = null;
    }
  }
  switch (easterEgg) {
    case "zelda1":
      alert("Zelda fan, eh?");
      break;
    default:
      break;
  }

  if (easterEgg == null) {
    for (let messageIndex = 0; messageIndex < messageArray.length; messageIndex++) {
      let allowedWordsFound = false;
      for (let allowedWordsIndex = 0; allowedWordsIndex < allowedWords.length; allowedWordsIndex++) {
        if (internalMessageArray[messageIndex].toLowerCase() == allowedWords[allowedWordsIndex]) {
          allowedWordsFound = true;
        }
      }
      if (!allowedWordsFound) {
        for (let badWordsIndex = 0; badWordsIndex < badWords.length; badWordsIndex++) {
          if (internalMessageArray[messageIndex].toLowerCase().search(badWords[badWordsIndex]) != -1) {
            let starsCount = "";
            for (let hashIndex = 1; hashIndex < messageArray[messageIndex].length; hashIndex++) {
              starsCount = starsCount + "*";
            }
            messageArray[messageIndex] = messageArray[messageIndex].charAt(0) + starsCount;
          }
        }
      }
    }

    filteredMessage = messageArray.join(" ");
  }

  return filteredMessage;
}

function checkCurses(message) {
  // Turn the message string into an array
  let permIndex = 100;
  let permReplacedMessage = replaceCharacters(message, permReplacedWords);
  let lastPermReplacedMessage;
  while (permReplacedMessage != lastPermReplacedMessage && permIndex > 0) {
    lastPermReplacedMessage = permReplacedMessage;
    permReplacedMessage = replaceCharacters(permReplacedMessage, permReplacedWords);
    permIndex--;
  }
  let messageArray = message.split(" ");
  let internalIndex = 100;
  let internalMessageArray = replaceCharacters(permReplacedMessage, tempReplaceWords);
  let lastInternalMessageArray;
  while (internalMessageArray != lastInternalMessageArray && internalIndex > 0) {
    lastInternalMessageArray = internalMessageArray;
    internalMessageArray = replaceCharacters(internalMessageArray, tempReplaceWords);
    internalIndex--;
  }
  internalMessageArray = replaceCharacters(internalMessageArray, tempReplaceWords).split(" ");

  let cursed = false

  for (let messageIndex = 0; messageIndex < messageArray.length; messageIndex++) {
    let allowedWordsFound = false;
    for (let allowedWordsIndex = 0; allowedWordsIndex < allowedWords.length; allowedWordsIndex++) {
      if (internalMessageArray[messageIndex].toLowerCase() == allowedWords[allowedWordsIndex]) {
        allowedWordsFound = true;
      }
    }
    if (!allowedWordsFound) {
      for (let badWordsIndex = 0; badWordsIndex < badWords.length; badWordsIndex++) {
        if (internalMessageArray[messageIndex].toLowerCase().search(badWords[badWordsIndex]) != -1) {
          cursed = true
        }
      }
    }
  }

  return cursed;
}

function replaceCharacters(message, twoDArray) {
  // Cycle through all of the items in the 2 dimensionnal array
  for (let twoDIndex = 0; twoDIndex < twoDArray.length; twoDIndex++) {
    message = message.replaceAll(twoDArray[twoDIndex][0], twoDArray[twoDIndex][1]);
  }
  return message;
}



export { checkMessage, replaceCharacters, checkCurses };