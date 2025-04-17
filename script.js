
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.addEventListener("keydown", () => {
    if (!started) {
        document.getElementById("level-title").textContent = "Nivel " + level;
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Nivel " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    let btn = document.getElementById(randomChosenColor);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 200);
    playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    let btn = document.getElementById(currentColor);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.getElementById("level-title").textContent = "Game Over, presiona cualquier tecla para reiniciar";
        setTimeout(() => document.body.classList.remove("game-over"), 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
