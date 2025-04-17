
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;

function checkGuess() {
  const input = document.getElementById("guessInput");
  const guess = parseInt(input.value);
  const message = document.getElementById("message");

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "Por favor ingresa un número válido entre 1 y 100.";
    message.className = "message error";
    return;
  }

  if (guess === secretNumber) {
    message.textContent = `¡Felicidades! Adivinaste el número: ${secretNumber}`;
    message.className = "message success";
    disableGame();
  } else {
    attemptsLeft--;
    if (attemptsLeft === 0) {
      message.textContent = `Perdiste. El número era ${secretNumber}.`;
      message.className = "message error";
      disableGame();
    } else {
      message.textContent = guess < secretNumber ? "Muy bajo. Intenta un número mayor." : "Muy alto. Intenta un número menor.";
      message.className = "message error";
      document.getElementById("attempts").textContent = attemptsLeft;
    }
  }

  input.value = "";
  input.focus();
}

function disableGame() {
  document.getElementById("guessInput").disabled = true;
  document.querySelector("button").disabled = true;
}
