let keys = {
  'q': '', 'w': '', 'e': '', 'r': '', 't': '', 'y': '', 'u': '', 'i': '', 'o': '', 'p': '', 'break': '',
  'a': '', 's': '', 'd': '', 'f': '', 'g': '', 'h': '', 'j': '', 'k': '', 'l': '', 'break2': '',
  'enter': '', 'z': '', 'x': '', 'c': '', 'v': '', 'b': '', 'n': '', 'm': '', '⌫': ''
};

let guesses = [];
let currentGuess = [];

const wordList = [
  "Dog", "Cat", "Sun", "Run", "Pen",
  "Bat", "Car", "Bus", "Cap", "Fan",
  "Cow", "Box", "Cup", "Key", "Egg",
  "Lip", "Arm", "Leg", "Arm", "Gum",
  "Jam", "Log", "Map", "Nap", "Oak",
  "Pig", "Rug", "Toy", "Wig", "Ant",
  "Bow", "Cow", "Dry", "Elf", "Fog",
  "God", "Hen", "Ink", "Jug", "Kit",
  "Lip", "Man", "Net", "Owl", "Cop",
  "Rod", "Sky", "Toy", "Van", "Zip"
];
const SecretWord = wordList[Math.floor(Math.random() * wordList.length)];

const NumberOfGuesses = 6;
const Correct = 'correct';
const Found = 'found';
const Wrong = 'wrong';

function initialize() {
  let guessGrid = document.getElementById("guessGrid");
  for (let i = 0; i < NumberOfGuesses; i++) {
    for (let j = 0; j < SecretWord.length; j++) {
      guessGrid.innerHTML += `<div id="${i}${j}" class="key-guess"></div>`;
    }
    guessGrid.innerHTML += '<br/>';
  }

  let keyboard = document.getElementById("keyboard");
  Object.keys(keys).forEach((key) => {
    if (key.includes('break')) {
      keyboard.innerHTML += '<br/>';
    } else {
      keyboard.innerHTML += `<button id="${key}" class="key" onclick="keyClick('${key}')">` + key + '</button>';
    }
  });
}
initialize();

function keyClick(key) {
  switch (key) {
    case '⌫':
      backspace();
      break;
    case 'enter':
      enter();
      break;
    default:
      if (currentGuess.length < SecretWord.length && guesses.length < NumberOfGuesses) {
        currentGuess.push({ key: key, result: '' });
        updateCurrentGuess();
      }
  }

  if (guesses.length >= NumberOfGuesses && !currentGuess.length) {
    window.alert("You lost! The word was: " + SecretWord);
  }
}


function backspace() {
  if (currentGuess.length > 0) {
    currentGuess.pop();
  }
  updateCurrentGuess();
}

function enter() {
  if (currentGuess.length < SecretWord.length || guesses.length >= NumberOfGuesses) {
    if (guesses.length >= NumberOfGuesses && currentGuess.length === 0) {
      window.alert("You lost! The word was: " + SecretWord);
    }
    return;
  }
  
  const guessedWord = currentGuess.map(guess => guess.key).join('').toLowerCase(); 
  const secretWordLowerCase = SecretWord.toLowerCase(); 
  
  let isCorrect = guessedWord === secretWordLowerCase;

  currentGuess.forEach((keyGuess, index) => {
    if (isCorrect) {
      keyGuess.result = Correct;
    } else if (secretWordLowerCase.includes(keyGuess.key.toLowerCase())) {
      if (secretWordLowerCase.indexOf(keyGuess.key.toLowerCase()) === index) { 
        keyGuess.result = Correct;
      } else {
        keyGuess.result = Found;
      }
    } else {
      keyGuess.result = Wrong;
    }

    if (keys[keyGuess.key] !== Correct) {
      keys[keyGuess.key] = keyGuess.result;
    }
  });
  updateCurrentGuess(true);
  if (isCorrect) {
    window.alert("Congratulations! You won!");
  }
  guesses.push(currentGuess);
  currentGuess = [];

  if (guesses.length >= NumberOfGuesses && currentGuess.length === 0) {
    window.alert("You lost! The word was: " + SecretWord);
  }
}



function updateKeyboard() {
  for (const key in keys) {
    if (keys[key] !== '') {
      let keyElement = document.getElementById(`${key}`);
      keyElement.className = '';
      keyElement.classList.add(keys[key]);
      keyElement.classList.add('key');
    }
  }
}

function updateCurrentGuess(guessed = false) {
  let index = guesses.length;
  for (let i = 0; i < SecretWord.length; i++) {
    let guessGrid = document.getElementById(`${index}${i}`);
    if (currentGuess[i]) {
      guessGrid.innerHTML = currentGuess[i].key;
    } else {
      guessGrid.innerHTML = '';
    }
    if (guessed) {
      guessGrid.classList.add(currentGuess[i].result);
    }
  }
  if (guessed) {
    updateKeyboard();
  }
}


const icon = document.querySelector('.ico'); 
const penis = document.querySelector(".ico p");
let c = 0;

icon.addEventListener("click", () => {
    if (c % 2 === 0) {
        penis.style.padding = "10px";
        penis.innerHTML = `<b>How To Play?</b><br>Guess the Word in 6 tries.<br>Each guess must be a valid 3-letter word.<br>The color of the tiles will change to show how close your guess was to the word.`;
        c += 1;
    } else {
        penis.innerText = ``;
        penis.style.padding = "0px";
        c += 1;
    }
});
