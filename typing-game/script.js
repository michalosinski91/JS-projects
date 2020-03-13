const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game");
const settingsBtn = document.getElementById("settings-btn");
const settingsEl = document.getElementById("settings");
const settingsFormEl = document.getElementById("settings-form");
const difficultySelectEl = document.getElementById("difficulty");

let words;
let randomWord;
let score;
let time;
let timeInterval;

//Focus on text on load
textEl.focus();

// fetch a list of words for the game from API
async function getWords() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=200`
  );
  const data = await res.json();
  words = data;
  nextWord();
  time = 10;
  score = 0;
  updateTimeDOM();
  countdown();
}
// pick a random word from the words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// adds the randomWord to the DOM
function addWordToDOM() {
  wordEl.innerHTML = randomWord;
}

// assigns a random word to randomWord variable and adds it to the DOM
function nextWord() {
  randomWord = getRandomWord();
  addWordToDOM();
}

// update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//upate time element in DOM
function updateTimeDOM() {
  timeEl.innerHTML = time + "s";
}

// start counting down
function countdown() {
  timeInterval = setInterval(updateTime, 1000);
}

//update time
function updateTime() {
  time--;
  updateTimeDOM();

  if (time === 0) {
    clearInterval(timeInterval);
    // end the game
    gameOver();
  }
}

// end of the game functionality - displays final score and option to play again
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick="newGame()">Play Again</button>
  `;

  endgameEl.classList.add("container__end-game--show");
}

// reset the game to play again
function newGame() {
  time = 10;
  score = 0;
  randomWord = "";
  addWordToDOM();
  getWords();
  endgameEl.classList.remove("container__end-game--show");
}

//Event listeners
textEl.addEventListener("input", e => {
  //gets the input text
  const insertedText = e.target.value;
  // compare input to the random word
  if (insertedText === randomWord) {
    // if it matches, generate the next word, add to score, reset timer and clear input
    nextWord();
    updateScore();
    e.target.value = "";
    time += 4;
    updateTime();
  }
});

// Initial game setup - fetch list of words and
getWords();
