import { blockedWords, allowedWords } from '../../../public/scripts/unvaryingData/blockedWords.js';

function checkMessage(message) {
  // Turn the message string into an array
  const messageArray = message.split(" ");

  for (let messageIndex = 0; messageIndex < messageArray.length; messageIndex++) {
    for (let blockedWordsIndex = 0; blockedWordsIndex < blockedWords.length; blockedWordsIndex++) {
      if (messageArray[messageIndex].toLowerCase().search(blockedWords[blockedWordsIndex][0]) != -1) {
        // See what type of blocked it is (1 = curse; 2 = banned character)
        switch (blockedWords[blockedWordsIndex][2]) {
          case 1 /* Curse Words */:
            let hasAllowedWord = false;
            for (let allowedWordsIndex = 0; allowedWordsIndex < allowedWords.length; allowedWordsIndex++) {
              if (messageArray[messageIndex].toLowerCase().search(allowedWords[allowedWordsIndex]) != -1) {
                hasAllowedWord = true;
              }
            }
            if (!hasAllowedWord) {
              let starsCount = "";
              for (let hashIndex = 1; hashIndex < messageArray[messageIndex].length; hashIndex++) {
                starsCount = starsCount + "*";
              }
              messageArray[messageIndex] = messageArray[messageIndex].charAt(0) + starsCount;
              console.log("Curse");
            }
            break;
          case 2 /* Banned Characters */:
            messageArray[messageIndex] = messageArray[messageIndex].replace(/${blockedWords[blockedWordsIndex][0]}/gi, blockedWords[blockedWordsIndex][1]);
            console.log("Blocked character");
            break;
          case 3 /* Easter-Egg */:
            alert("You found an Easter-Egg, Good job!");
            return null;
          default /* Out of Bounds */:
            console.error(`Value is out of bounds for second dimension of \"blockedWords\" array.`);
            alert(`A server-side error has occured.`);
            return null;
        }
      }
    }
  }
  const filteredMessage = messageArray.join(" ");
  return filteredMessage;
}

export { checkMessage };