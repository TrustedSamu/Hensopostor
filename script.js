// German words for the game with their categories
const wordCategories = {
    sports: [
        'Lamine Yamal', 'Jude Bellingham', 'Erling Haaland', 'Kylian Mbappé', 'Florian Wirtz',
        'Jamal Musiala', 'Victor Osimhen', 'Rafael Leão', 'Federico Chiesa', 'Rodri',
        'Fußball-WM', 'Olympische Spiele', 'Wimbledon', 'Tour de France', 'Formel 1'
    ],
    places: [
        'Eiffelturm', 'Brandenburger Tor', 'Sagrada Familia', 'Taj Mahal', 'Sydney Opera House',
        'Mount Everest', 'Niagara Falls', 'Grand Canyon', 'Disneyland', 'Burj Khalifa'
    ],
    entertainment: [
        'Titanic', 'Star Wars', 'Harry Potter', 'James Bond', 'The Matrix',
        'Mickey Mouse', 'Superman', 'Batman', 'Spider-Man', 'Iron Man'
    ],
    food: [
        'Sushi', 'Pizza', 'Hamburger', 'Currywurst', 'Döner',
        'Espresso', 'Cocktail', 'Wein', 'Bier', 'Champagner'
    ]
};

// Category-specific hints
const categoryHints = {
    sports: [
        "Es hat etwas mit Bewegung zu tun",
        "Es ist etwas, das man im Stadion sehen kann",
        "Es ist etwas, das man im Fernsehen sehen kann",
        "Es ist etwas, das man im Team macht",
        "Es ist etwas, das man mit einem Ball macht"
    ],
    places: [
        "Es ist etwas, das man besuchen kann",
        "Es ist etwas, das man auf Fotos sehen kann",
        "Es ist etwas, das man auf Reisen sehen kann",
        "Es ist etwas, das man auf einer Karte finden kann",
        "Es ist etwas, das man nicht mitnehmen kann"
    ],
    entertainment: [
        "Es ist etwas, das man im Kino sehen kann",
        "Es ist etwas, das man im Fernsehen sehen kann",
        "Es ist etwas, das man in einem Buch lesen kann",
        "Es ist etwas, das man in einem Spiel spielen kann",
        "Es ist etwas, das man in einem Film sehen kann"
    ],
    food: [
        "Es ist etwas, das man essen kann",
        "Es ist etwas, das man trinken kann",
        "Es ist etwas, das man in einem Restaurant bestellen kann",
        "Es ist etwas, das man in einer Küche machen kann",
        "Es ist etwas, das man auf einem Teller servieren kann"
    ]
};

let currentPlayer = 1;
let totalPlayers = 4;
let impostors = [];
let currentWord = '';
let isFreakMode = false;
let currentHint = '';

// DOM Elements
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const playerCountInput = document.getElementById('player-count');
const startGameBtn = document.getElementById('start-game');
const nextPlayerBtn = document.getElementById('next-player');
const currentPlayerSpan = document.getElementById('current-player');
const roleText = document.getElementById('role-text');
const wordDisplay = document.getElementById('word-display');
const wordText = document.getElementById('word-text');
const hintDisplay = document.getElementById('hint-display');
const hintText = document.getElementById('hint-text');
const freakModeCheckbox = document.getElementById('freak-mode');

// Event Listeners
startGameBtn.addEventListener('click', startGame);
nextPlayerBtn.addEventListener('click', showNextPlayer);
freakModeCheckbox.addEventListener('change', function() {
    isFreakMode = this.checked;
});

function getWordCategory(word) {
    for (const [category, words] of Object.entries(wordCategories)) {
        if (words.includes(word)) {
            return category;
        }
    }
    return null;
}

function getRandomHintForCategory(category) {
    const hints = categoryHints[category];
    return hints[Math.floor(Math.random() * hints.length)];
}

function startGame() {
    totalPlayers = parseInt(playerCountInput.value);
    if (totalPlayers < 4) {
        alert('Mindestens 4 Spieler sind erforderlich!');
        return;
    }

    // Select random word and get its category
    const allWords = Object.values(wordCategories).flat();
    currentWord = allWords[Math.floor(Math.random() * allWords.length)];
    const wordCategory = getWordCategory(currentWord);
    
    // Select appropriate hint for the word's category
    currentHint = getRandomHintForCategory(wordCategory);

    // Select impostors
    if (isFreakMode) {
        // In Freak Mode, randomly choose between 1 and 3 impostors
        const maxImpostors = Math.min(3, Math.floor(totalPlayers / 2));
        const numImpostors = Math.floor(Math.random() * maxImpostors) + 1;
        impostors = [];
        while (impostors.length < numImpostors) {
            const randomPlayer = Math.floor(Math.random() * totalPlayers) + 1;
            if (!impostors.includes(randomPlayer)) {
                impostors.push(randomPlayer);
            }
        }
    } else {
        // Normal mode: 1 impostor for 4 players, 2 for more
        const numImpostors = totalPlayers > 4 ? 2 : 1;
        impostors = [];
        while (impostors.length < numImpostors) {
            const randomPlayer = Math.floor(Math.random() * totalPlayers) + 1;
            if (!impostors.includes(randomPlayer)) {
                impostors.push(randomPlayer);
            }
        }
    }

    // Reset game state
    currentPlayer = 1;
    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    showCurrentPlayer();
}

function showCurrentPlayer() {
    currentPlayerSpan.textContent = currentPlayer;
    wordDisplay.classList.add('hidden');
    hintDisplay.classList.add('hidden'); // Hide hint by default

    if (isFreakMode) {
        // Only show hint in Freak Mode
        hintDisplay.classList.remove('hidden');
        hintText.textContent = `Hinweis: ${currentHint}`;
    }

    if (impostors.includes(currentPlayer)) {
        roleText.textContent = 'Du bist der Impostor!';
    } else {
        roleText.textContent = 'Du bist ein normaler Spieler!';
        wordText.textContent = currentWord;
        wordDisplay.classList.remove('hidden');
    }
}

function showNextPlayer() {
    currentPlayer++;
    if (currentPlayer > totalPlayers) {
        // Game setup for next round
        setupScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
        return;
    }
    showCurrentPlayer();
} 