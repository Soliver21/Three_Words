let keys = {
  'q': '', 'w': '', 'e': '', 'r': '', 't': '', 'y': '', 'u': '', 'i': '', 'o': '', 'p': '', 'break': '',
  'a': '', 's': '', 'd': '', 'f': '', 'g': '', 'h': '', 'j': '', 'k': '', 'l': '', 'break2': '',
  'enter': '', 'z': '', 'x': '', 'c': '', 'v': '', 'b': '', 'n': '', 'm': '', '⌫': ''
};

let guesses = [];
let currentGuess = [];
let SecretWord;

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
    showPopup("You lost! The word was: " + SecretWord);
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
      showPopup("You lost! The word was: " + SecretWord);
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
    showPopup("Congratulations! You won!");
  }
  guesses.push(currentGuess);
  currentGuess = [];

  if (guesses.length >= NumberOfGuesses && currentGuess.length === 0) {
    showPopup("You lost! The word was: " + SecretWord);
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

function showPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  popupMessage.textContent = message;
  popup.style.display = 'block';
}

document.getElementById('replay').addEventListener('click', function() {
  resetGame();
  document.getElementById('popup').style.display = 'none';
});

function resetGame() {
  // Üres tömbök inicializálása
  guesses = [];
  currentGuess = [];

  // Véletlenszerű szó kiválasztása és beállítása
  SecretWord = wordList[Math.floor(Math.random() * wordList.length)];

  // Gombok visszaállítása az eredeti állapotba
  for (const key in keys) {
    keys[key] = '';
  }

  // Gombok frissítése a felhasználói felületen
  updateKeyboard();

  // Játékmezők és billentyűzet frissítése a kezdeti állapotnak megfelelően
  let guessGrid = document.getElementById("guessGrid");
  guessGrid.innerHTML = '';
  initialize();

  // Tippelt betűk színeinek törlése
  let guessGridItems = document.querySelectorAll('.key-guess');
  guessGridItems.forEach(item => {
    item.style.backgroundColor = '';
    item.style.borderColor = '';
    item.style.color = '';
  });

  // Alsó sorban lévő betűk stílusainak törlése
  let keyboardItems = document.querySelectorAll('.key');
  keyboardItems.forEach(item => {
    item.style.backgroundColor = '';
    item.style.borderColor = '';
    item.style.color = '';
  });
}


// Játék kezdeti inicializálása
SecretWord = wordList[Math.floor(Math.random() * wordList.length)];
initialize();



const icon = document.querySelector('.ico'); 
const img = document.querySelector(".ico img");
const headerp = document.querySelector(".ico p");
let c = 0;
icon.addEventListener("click", () => {
    if (c % 2 == 0) {
        headerp.style.padding = "10px";
        img.src = "./icons/lightbulb2.png";
        headerp.innerHTML = `<b>How To Play?</b><br>Guess the Word in 6 tries.<br>Each guess must be a valid 3-letter word.<br><br><b>The color of the tiles will change to show how close your guess was to the word:</b> <br><i>gray</i>(not in the word)<br><i>yellow</i>(contains it, but not in the correct place)<br><i>green</i>(in the word and in the right place)`;
        c += 1;
    } else {
        headerp.innerText = ``;
        img.src="./icons/lightbulb.png";
        headerp.style.padding = "0px";
        c += 1;
    }
});

const li1 = document.querySelector("#egy");
const li2 = document.querySelector("#masodik");
let c2 = 0;
li1.addEventListener("click", () => {
    if (c2 % 2 === 0) {
        li1.innerHTML = `Fekete Olivér András: <span>+36 70 458 95</span><br>Gyetvai Ádám: <span>+36 20 456 87</span>`;
        c2 += 1;
    } else {
        li1.innerHTML = `Contact`;
        c2 += 1;
    }
});

let c3 = 0;
li2.addEventListener("click", () => {
    if (c3 % 2 === 0) {
        li2.innerHTML = `Fekete Olivér András: <span>feketeoliver06@gmail.com</span><br>Gyetvai Ádám: <span>adamgyetvai26@gmail.com</span>`;
        c3 += 1;
    } else {
        li2.innerHTML = `Support`;
        c3 += 1;
    }
});

