const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const movesCountEl = document.getElementById('moves-count');
const timerEl = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');
const modeSelect = document.getElementById('mode');

// Emoji set
const emojiSet = ['🍎','🍌','🍇','🍓','🍒','🥝','🍑','🍍','🥭','🍉','🍋','🍊'];

let cards = [];
let flippedCards = [];
let moves = 0;
let time = 0;
let timerInterval;

// ---------------- INIT GAME ----------------
function initGame() {
    clearInterval(timerInterval);
    moves = 0;
    time = 0;
    flippedCards = [];
    board.innerHTML = '';
    movesCountEl.textContent = 'Moves: 0';
    timerEl.textContent = 'Time: 0s';

    const difficulty = difficultySelect.value;
    const mode = modeSelect.value;

    let pairs = 8, columns = 4;

    if (difficulty === 'medium') {
        pairs = 10;
        columns = 5;
    } else if (difficulty === 'hard') {
        pairs = 12;
        columns = 6;
    }

    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    // Choose card values based on mode
    let values = [];
    if (mode === 'emoji') {
        values = emojiSet.slice(0, pairs);
    } else {
        values = Array.from({ length: pairs }, (_, i) => i + 1);
    }

    cards = [...values, ...values];
    shuffle(cards);

    cards.forEach(value => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${value}</div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });

    startTimer();
}

// ---------------- TIMER ----------------
function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timerEl.textContent = `Time: ${time}s`;
    }, 1000);
}

// ---------------- SHUFFLE (Fisher-Yates) ----------------
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ---------------- FLIP LOGIC ----------------
function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesCountEl.textContent = `Moves: ${moves}`;

        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
            flippedCards = [];
            checkWin();
        } else {
            setTimeout(() => {
                flippedCards.forEach(c => c.classList.remove('flipped'));
                flippedCards = [];
            }, 700);
        }
    }
}

// ---------------- CHECK WIN ----------------
function checkWin() {
    const allMatched = [...document.querySelectorAll('.card')]
        .every(card => card.classList.contains('flipped'));

    if (allMatched) {
        clearInterval(timerInterval);
        confetti();
        setTimeout(() => {
            alert(`🎉 You won in ${moves} moves and ${time} seconds!`);
        }, 300);
    }
}

// ---------------- EVENTS ----------------
restartBtn.addEventListener('click', initGame);
difficultySelect.addEventListener('change', initGame);
modeSelect.addEventListener('change', initGame);

// Start game
initGame();
