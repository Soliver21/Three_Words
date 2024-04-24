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
        if (currentGuess.length < SecretWord.length
          && guesses.length < NumberOfGuesses) {
          currentGuess.push({ key: key, result: '' });
          updateCurrentGuess();
        }
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
      if (guesses.length >= NumberOfGuesses) {
        window.alert("You lost! The word was: " + SecretWord);
      }
      return;
    }
    let isCorrect = true;
    for (let i = 0; i < SecretWord.length; i++) {
      if (SecretWord.charAt(i) !== currentGuess[i].key) {
        isCorrect = false;
        break;
      }
    }
    currentGuess.forEach((keyGuess, index) => {
      if (isCorrect) {
        keyGuess.result = Correct;
      } else if (SecretWord.includes(keyGuess.key)) {
        if (SecretWord.indexOf(keyGuess.key) === index) { // Check if the letter is in the correct place
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
  