const cardsArray = ['🍟', '🍟', '🍕', '🍕', '🍗', '🍗', '🍔', '🍔', '🥨', '🥨', '🍩', '🍩', '🍿', '🍿', '🥐', '🥐'];

let flippedCards = [];
let matchedCardsCount = 0;
const grid = document.getElementById('game-grid');

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    grid.innerHTML = "";
    const shuffledCards = shuffle([...cardsArray]);
    
    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = emoji;
        card.dataset.id = index;
        card.innerText = emoji;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.name === card2.dataset.name) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCardsCount += 2;
        
        if (matchedCardsCount === cardsArray.length) {
            alert('Herzlichen Glückwunsch! Du hast gewonnen! 🎉');
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}
function resetGame() {
    flippedCards = [];
    matchedCardsCount = 0;
    createBoard();
}
createBoard();
