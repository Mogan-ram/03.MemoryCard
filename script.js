document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const newGameBtn = document.getElementById('new-game-btn');
    const movesCountSpan = document.getElementById('moves-count');
    const timeCountSpan = document.getElementById('time-count');
    const congratulationsMessage = document.getElementById('congratulations-message');
    const finalMovesSpan = document.getElementById('final-moves');
    const finalTimeSpan = document.getElementById('final-time');
    const playAgainBtn = document.getElementById('play-again-btn');
    const highscoreBox = document.getElementById('highscore-box');
    const highscoreValue = document.getElementById('highscore-value');


    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timer = null;
    let seconds = 0;
    let gameStarted = false; // To control timer start

    // --- Card Data (You can add more images/themes here) ---
    const cardImages = [
        'anu.jpg', 'anup.jpg', 'anupama.jpg', 'beni.jpg', 'beni2.jpg', 'rdj1.jpg', 'rdj2.jpg', 'super.jpg', 'superman.jpg', 'thanos.jpg',
    ];

    function getHighscore() {
        const hs = localStorage.getItem('memory_highscore');
        return hs ? JSON.parse(hs) : null;
    }

    function setHighscore(moves, seconds) {
        // Lower score is better. Score = moves * 1000 + seconds
        const score = moves * 1000 + seconds;
        localStorage.setItem('memory_highscore', JSON.stringify({ moves, seconds, score }));
    }

    function updateHighscoreDisplay() {
        const hs = getHighscore();
        if (hs) {
            highscoreValue.textContent = `${hs.moves} moves, ${hs.seconds}s`;
        } else {
            highscoreValue.textContent = '--';
        }
    }

    function maybeUpdateHighscore() {
        const hs = getHighscore();
        const currentScore = moves * 1000 + seconds;
        if (!hs || currentScore < hs.score) {
            setHighscore(moves, seconds);
            updateHighscoreDisplay();
            // Optional: Add a little animation
            highscoreBox.style.background = 'rgba(40,167,69,0.35)';
            setTimeout(() => {
                highscoreBox.style.background = '';
            }, 1200);
        }
    }

    // --- Game Initialization ---
    function initializeGame() {
        // Create pairs of cards
        cards = [...cardImages, ...cardImages].map((image, index) => ({
            id: index, // Unique ID for each card instance
            image: image,
            isFlipped: false,
            isMatched: false
        }));

        updateHighscoreDisplay();
        shuffleCards();
        renderGameBoard();
        resetGameStats();
        hideCongratulations();
    }

    function displayCongratulations() {
        finalMovesSpan.textContent = moves;
        finalTimeSpan.textContent = `${seconds}s`;
        congratulationsMessage.classList.remove('hidden');
        maybeUpdateHighscore();
    }

    // --- Shuffle Cards ---
    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]]; // ES6 destructuring for swap
        }
    }

    // --- Render Game Board ---
    function renderGameBoard() {
        gameBoard.innerHTML = ''; // Clear previous board

        // Determine grid columns based on card count (e.g., 4x4 for 16 cards, 6x6 for 36)
        const numCards = cards.length;
        let columns;
        if (numCards === 16) {
            columns = 4;
        } else if (numCards === 36) {
            columns = 6;
        } else {
            // Default or calculate dynamically for other counts
            columns = Math.sqrt(numCards); // Assumes perfect square
        }
        gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id; // Store unique instance ID
            cardElement.dataset.image = card.image; // Store image for matching

            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div> <div class="card-back">
                        <img src="./images/${card.image}" alt="${card.image.split('.')[0]}">
                    </div>
                </div>
            `;

            cardElement.addEventListener('click', handleCardClick);
            gameBoard.appendChild(cardElement);
        });
    }

    // --- Handle Card Click ---
    function handleCardClick(event) {
        if (!gameStarted) {
            startGameTimer();
            gameStarted = true;
        }

        const clickedCardElement = event.currentTarget;

        // Prevent flipping already flipped or matched cards, or more than two cards
        if (clickedCardElement.classList.contains('flipped') ||
            clickedCardElement.classList.contains('matched') ||
            flippedCards.length === 2) {
            return;
        }

        clickedCardElement.classList.add('flipped');
        flippedCards.push(clickedCardElement);

        if (flippedCards.length === 2) {
            incrementMoves();
            checkForMatch();
        }
    }

    // --- Check for Match ---
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const image1 = card1.dataset.image;
        const image2 = card2.dataset.image;

        if (image1 === image2) {
            // Match found!
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                flippedCards = []; // Reset flipped cards
                checkGameEnd();
            }, 800); // Allow time for flip animation
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = []; // Reset flipped cards
            }, 1000); // Flip back after a short delay
        }
    }

    // --- Increment Moves ---
    function incrementMoves() {
        moves++;
        movesCountSpan.textContent = moves;
    }

    // --- Start Game Timer ---
    function startGameTimer() {
        if (timer) clearInterval(timer); // Clear any existing timer
        seconds = 0;
        timeCountSpan.textContent = `${seconds}s`;
        timer = setInterval(() => {
            seconds++;
            timeCountSpan.textContent = `${seconds}s`;
        }, 1000);
    }

    // --- Stop Game Timer ---
    function stopGameTimer() {
        clearInterval(timer);
        timer = null;
    }

    // --- Check Game End ---
    function checkGameEnd() {
        if (matchedPairs === cardImages.length) { // Half the total cards
            stopGameTimer();
            displayCongratulations();
        }
    }

    // --- Display Congratulations ---
    function displayCongratulations() {
        finalMovesSpan.textContent = moves;
        finalTimeSpan.textContent = `${seconds}s`;
        congratulationsMessage.classList.remove('hidden');
    }

    // --- Hide Congratulations ---
    function hideCongratulations() {
        congratulationsMessage.classList.add('hidden');
    }

    // --- Reset Game Stats ---
    function resetGameStats() {
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        seconds = 0;
        gameStarted = false;
        movesCountSpan.textContent = moves;
        timeCountSpan.textContent = `${seconds}s`;
        stopGameTimer(); // Ensure timer is stopped
    }

    // --- Event Listeners for Buttons ---
    newGameBtn.addEventListener('click', initializeGame);
    playAgainBtn.addEventListener('click', initializeGame);

    // --- Initial Call to Start Game ---
    initializeGame();
});