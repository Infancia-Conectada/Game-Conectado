// ========== ELEMENTOS DO DOM ==========
const gameScreen = document.getElementById('game-screen');
const menuScreen = document.getElementById('menu-screen');
const jogarOption = document.querySelector('.menu-option-jogar');
const deckSelectionModal = document.getElementById('deck-selection-modal');
const btnConfirmSelection = document.getElementById('btn-confirm-selection');
const btnCancelSelection = document.getElementById('btn-cancel-selection');
const playerHandContainer = document.getElementById('player-hand-container');
const confirmPlayButton = document.getElementById('btn-confirm-play');
const revealedCardSlot = document.getElementById('revealed-card-slot');
const deckPileSlot = document.getElementById('deck-pile-slot');
const discardPileSlot = document.getElementById('discard-pile-slot');

// ========== ESTADO DO JOGO ==========
let gameState = {
    selectedDeck: null,
    selectedAmulet: null,
    playerHand: [],
    playerSelectedCards: [],
    playerDeck: [],
    opponentDeck: [],
    centralDeck: [],
    revealedCard: null,
    gameStarted: false
};

// ========== FUNÇÕES AUXILIARES ==========

// Embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Criar um baralho com cartas genéricas
function createDeck(deckNumber, cardCount = 20) {
    const deck = [];
    for (let i = 0; i < cardCount; i++) {
        deck.push({
            id: `${deckNumber}-${i}`,
            name: `Carta ${i + 1}`,
            image: `../img/cards/card-${i + 1}.png`
        });
    }
    return deck;
}

// Abrir modal de seleção
function openDeckSelectionModal() {
    deckSelectionModal.classList.add('active');
    gameState.selectedDeck = null;
    gameState.selectedAmulet = null;
    resetModalSelections();
}

// Fechar modal de seleção
function closeDeckSelectionModal() {
    deckSelectionModal.classList.remove('active');
}

// Resetar seleções do modal
function resetModalSelections() {
    document.querySelectorAll('.deck-option, .amulet-option').forEach(option => {
        option.classList.remove('selected');
    });
}

// Selecionar deck
function selectDeck(deckNumber) {
    document.querySelectorAll('.deck-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-deck="${deckNumber}"]`).classList.add('selected');
    gameState.selectedDeck = deckNumber;
}

// Selecionar amuleto
function selectAmulet(amuletId) {
    document.querySelectorAll('.amulet-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-amulet="${amuletId}"]`).classList.add('selected');
    gameState.selectedAmulet = amuletId;
}

// Inicializar o jogo
function initializeGame() {
    if (!gameState.selectedDeck || !gameState.selectedAmulet) {
        alert('Por favor, selecione um deck e um amuleto!');
        return;
    }

    closeDeckSelectionModal();

    // Criar os baralhos
    gameState.playerDeck = shuffleArray(createDeck(gameState.selectedDeck));
    gameState.opponentDeck = shuffleArray(createDeck('opponent'));
    gameState.centralDeck = shuffleArray(createDeck('central'));

    // Revelar primeira carta do baralho central
    gameState.revealedCard = gameState.centralDeck.shift();
    displayCentralBoard();

    // Cada jogador compra 5 cartas
    for (let i = 0; i < 5; i++) {
        if (gameState.playerDeck.length > 0) {
            gameState.playerHand.push(gameState.playerDeck.shift());
        }
    }

    gameState.gameStarted = true;
    displayPlayerHand();

    // Transição para tela de jogo
    changeScreen(menuScreen, gameScreen);
}

// ========== EXIBIÇÃO ==========

// Exibir baralho central
function displayCentralBoard() {
    // Carta revelada
    if (gameState.revealedCard) {
        revealedCardSlot.textContent = 'Revelada';
        revealedCardSlot.style.backgroundImage = `url(${gameState.revealedCard.image})`;
    }

    // Baralho para compra
    if (gameState.centralDeck.length > 0) {
        deckPileSlot.textContent = `${gameState.centralDeck.length}`;
    }

    // Pilha de descarte
    discardPileSlot.textContent = '0';
}

// Exibir mão do jogador
function displayPlayerHand() {
    playerHandContainer.innerHTML = '';
    
    gameState.playerHand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('hand-card', 'half');
        cardElement.dataset.index = index;
        cardElement.style.backgroundImage = `url(${card.image})`;
        cardElement.title = card.name;
        
        cardElement.addEventListener('click', () => toggleCardSelection(index, cardElement));
        
        playerHandContainer.appendChild(cardElement);
    });
}

// Alternar seleção de carta
function toggleCardSelection(index, cardElement) {
    const cardIndex = gameState.playerSelectedCards.indexOf(index);
    
    // Limitar a 2 cartas selecionadas
    if (cardIndex === -1) {
        if (gameState.playerSelectedCards.length < 2) {
            gameState.playerSelectedCards.push(index);
            cardElement.classList.add('selected');
        }
    } else {
        gameState.playerSelectedCards.splice(cardIndex, 1);
        cardElement.classList.remove('selected');
    }
    
    updateConfirmButton();
}

// Atualizar estado do botão confirmar
function updateConfirmButton() {
    if (gameState.playerSelectedCards.length > 0) {
        confirmPlayButton.classList.remove('hidden');
    } else {
        confirmPlayButton.classList.add('hidden');
    }
}

// ========== EVENT LISTENERS ==========

// Botão Jogar no menu
jogarOption.addEventListener('click', () => {
    openDeckSelectionModal();
});

// Seleção de deck
document.querySelectorAll('.deck-option').forEach(option => {
    option.addEventListener('click', () => {
        selectDeck(option.dataset.deck);
    });
});

// Seleção de amuleto
document.querySelectorAll('.amulet-option').forEach(option => {
    option.addEventListener('click', () => {
        selectAmulet(option.dataset.amulet);
    });
});

// Confirmar seleção (deck + amuleto)
btnConfirmSelection.addEventListener('click', () => {
    initializeGame();
});

// Cancelar seleção
btnCancelSelection.addEventListener('click', () => {
    closeDeckSelectionModal();
});

// Confirmar jogada
confirmPlayButton.addEventListener('click', () => {
    console.log('Cartas selecionadas:', gameState.playerSelectedCards);
    // Aqui você implementará a lógica da jogada
    // Por ora, apenas limpa a seleção
    gameState.playerSelectedCards = [];
    document.querySelectorAll('.hand-card').forEach(card => {
        card.classList.remove('selected');
    });
    updateConfirmButton();
});