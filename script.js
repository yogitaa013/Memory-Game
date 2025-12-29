const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const movesCountEl = document.getElementById('moves-count');

let cards = [];
let flippedCards = [];
let moves = 0;

// Initialize game
function initGame() {
    moves = 0;
    movesCountEl.textContent = 'Moves: 0';
    board.innerHTML = '';
    flippedCards = [];

    // 1-8 pair numbers
    cards = [...Array(8).keys(), ...Array(8).keys()];
    shuffle(cards);

    // Create cards
    cards.forEach(num => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = num;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${num}</div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

// Fisher-Yates Shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Flip logic
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
            }, 800);
        }
    }
}

// Check win
function checkWin() {
    const allFlipped = Array.from(document.querySelectorAll('.card')).every(c => c.classList.contains('flipped'));
    if (allFlipped) {
        setTimeout(() => alert(`🎉 Congratulations! You completed in ${moves} moves!`), 500);
    }
}

restartBtn.addEventListener('click', initGame);
initGame();
