
let secretNumber = Math.floor(Math.random() * 100) + 1;


const guessInput = document.querySelector('#guessField');
const submitButton = document.querySelector('#subt');
const previousGuesses = document.querySelector('.guesses');
const remainingGuesses = document.querySelector('.lastResult');
const guessFeedback = document.querySelector('.lowOrHi');
const resultsArea = document.querySelector('.resultParas');

const playAgainButton = document.createElement('p');

let guesses = [];
let guessCount = 1;
let gameActive = true;

// Handle submit 
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    let currentGuess = parseInt(guessInput.value);
    console.log("Player guessed:", currentGuess);
    checkTheGuess(currentGuess);
});

// Check the player's guess
function checkTheGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a valid number between 1 and 100.');
    } else {
        guesses.push(guess);
        let guessesLeft = 10 - guessCount;

        previousGuesses.textContent = 'Previous Guesses: ' + guesses.join(', ');
        remainingGuesses.textContent = 'Remaining Guesses: ' + guessesLeft;

        if (guessCount === 10) {
            guessFeedback.textContent = `Game Over! The secret number was ${secretNumber}.`;
            endTheGame();
        } else {
            if (guess === secretNumber) {
                guessFeedback.textContent = `Congratulations! You guessed the number!`;
                endTheGame();
            } else if (guess < secretNumber) {
                guessFeedback.textContent = 'Too low! Try guessing higher.';
            } else if (guess > secretNumber) {
                guessFeedback.textContent = 'Too high! Try guessing lower.';
            }
        }
        guessCount++;
        guessInput.value = '';
    }
}

// End the game
function endTheGame() {
    guessInput.disabled = true;
    submitButton.disabled = true;
    playAgainButton.innerHTML = '<h2 id="newGameButton">Start New Game</h2>';
    resultsArea.appendChild(playAgainButton);
    startNewGame();
    gameActive = false;
}

// Start a new game
function startNewGame() {
    const newGameButton = document.querySelector('#newGameButton');
    newGameButton.addEventListener('click', function() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        guessCount = 1;
        guesses = [];
        previousGuesses.textContent = 'Previous Guesses:';
        remainingGuesses.textContent = 'Remaining Guesses: 10';
        guessFeedback.textContent = '';
        guessInput.disabled = false;
        submitButton.disabled = false;
        resultsArea.removeChild(playAgainButton);
        gameActive = true;
    });
}
