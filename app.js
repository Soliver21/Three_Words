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

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            let input = document.createElement('input');
            input.maxLength = "1";
            input.type = 'text';
            input.classList.add('guess-input');
            container.appendChild(input);
        }
        container.appendChild(document.createElement('br'));   
    }
    container.innerHTML += `<button type="button" id="submitButton">Submit</button>`;
});

const icon = document.querySelector('.ico');
const penis = document.querySelector(".ico p");
icon.addEventListener("click",()=>{
    penis.innerText = `How To Play?\nGuess the Word in 10 tries.\nEach guess must be a valid 3-letter word.\nThe color of the tiles will change to show how close your guess was to the word.`
})