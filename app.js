/*
    Szavak listája
*/
const words = [
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

document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector('.container');
    let randomWord;
    let guesses = [];
    let currentRow = 0; // Aktuális sor száma

    // Függvény a véletlenszerű szó kiválasztásához
    function chooseRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWord = words[randomIndex];
    }

    // Függvény a betűk ellenőrzéséhez és a megjelenítéshez
    function checkAndDisplayGuesses() {
        let correctPositions = [];
        let correctLetters = [];

        // Ellenőrzés
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === guesses[i]) {
                correctPositions.push(i);
            } else if (guesses.includes(randomWord[i])) {
                correctLetters.push(randomWord[i]);
            }
        }

        // Megjelenítés
        let spans = container.querySelectorAll('.guess-span-row-' + currentRow);
        for (let i = 0; i < spans.length; i++) {
            spans[i].style.backgroundColor = '';
            if (correctPositions.includes(i)) {
                spans[i].style.backgroundColor = 'lime';
            } else if (correctLetters.includes(spans[i].textContent)) {
                spans[i].style.backgroundColor = 'yellow';
            }
        }

        // Nyert-e?
        if (guesses.join('') === randomWord) {
            showModal(true);
        } else if (currentRow === 5) { // Ha az utolsó soron vagyunk és mégsem nyert
            showModal(false);
        } else {
            // Ha nincs nyertes, lépjünk a következő sorba
            currentRow++;
            if (currentRow < 6) {
                let spansNextRow = container.querySelectorAll('.guess-span-row-' + currentRow);
                for (let i = 0; i < spansNextRow.length; i++) {
                    spansNextRow[i].style.backgroundColor = '';
                }
            }
        }
    }

    // Felugró ablak megjelenítése nyertes vagy vesztes esetén
    function showModal(isWinner) {
        let message = isWinner ? "Gratulálok! Nyertél!" : "Sajnos nem sikerült. A helyes szó: " + randomWord;
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>${message}</p>
                <button id="restartButton">Új játék</button>
            </div>
        `;
        container.appendChild(modal);

        // Új játék gomb eseménykezelője
        document.getElementById('restartButton').addEventListener('click', () => {
            container.removeChild(modal);
            resetGame();
        });

        // Felugró ablak bezárása
        let closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            container.removeChild(modal);
        });
    }

    // Függvény a játék újraindításához
    function resetGame() {
        container.innerHTML = '';
        guesses = [];
        currentRow = 0;
        chooseRandomWord();
        renderSpans();
    }

    // Függvény a span elemek megjelenítéséhez
    function renderSpans() {
        for (let row = 0; row < 6; row++) {
            for (let i = 0; i < randomWord.length; i++) {
                let span = document.createElement('span');
                span.classList.add('guess-span-row-' + row);
                span.textContent = '';
                container.appendChild(span);
            }
            container.innerHTML += '<br>';
        }
    }

    // Gomb eseményfigyelője
    container.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'submitButton') {
            checkAndDisplayGuesses();
        }
    });

    // Játék indítása
    chooseRandomWord();
    renderSpans();
    container.innerHTML += `<button type="button" id="submitButton">Submit</button>`;
});
