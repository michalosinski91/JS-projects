const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "hangman",
  "lizard",
  "football",
  "internet",
  "business",
  "workflow",
  "stylesheet",
  "picture",
  "communication",
  "flowerbed",
  "thunder",
  "extraterrestrial",
  "estimate",
  "finance",
  "software",
  "emergency",
  "epidemic",
  "pandemic",
  "electricity",
  "heating",
  "savings",
  "property"
];

// randomly selects the word
var selectedWord;
const correctLetters = [];
const wrongLetters = [];

function selectWord() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
}
//Show hidden word
function displayWord() {
  //splits the selected word into an array of letters,
  //maps through the array and crates a span element for each letter
  //if the letter is present in the 'correctLetters' array, it publishes the letter
  //if it's not there, it leaves a blank element.
  //Finally, it joins the elements back together
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        letter =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ""
          }</span>`
      )
      .join("")}
  `;

  //removes 'new line' element
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  //checks if player won, and displays popup
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations, You Won!";
    popup.style.display = "flex";
  }
}

//Update the wrong letters
function updateWrongLettersEl() {
  //checks if wrongLetters array has any content
  //if it does, create a heading paragraph
  //then, populate the list with span element for each wrong letter
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  //loops through figureParts elements
  //if the index of the part is smaller than the length of the wrong letters array, display the part
  //otherwise, keep the part hidden
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //check if player lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately You Lost :(";
    popup.style.display = "flex";
  }
}

// show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Listens to keyboard clicks
window.addEventListener("keydown", e => {
  //keyCodes for letters are within 65-90 range (A-Z)
  //if the pressed key is a letter, it creates a letter const with the value of the pressed key
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    //checks if the letter is used in the selected word
    if (selectedWord.includes(letter)) {
      // if it is, check if it has already been guessed
      if (!correctLetters.includes(letter)) {
        //if not, add the letter to the correctLetters array and update view
        correctLetters.push(letter);
        displayWord();
      } else {
        //if it's already been used, inform the user
        showNotification();
      }
    } else {
      //if the letter is not correct, check if it has already been used
      if (!wrongLetters.includes(letter)) {
        //if it has not been used, add the letter to the wrong letters array and update the view
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        //if it's been used already, inform the user
        showNotification();
      }
    }
  }
});

// restart game
playAgainBtn.addEventListener("click", () => {
  correctLetters.length = 0;
  wrongLetters.length = 0;
  selectWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});

// initial view update
selectWord();
