// ========== ELEMENTOS DO DOM ==========
//let gameScreen = document.getElementById('game-screen');
//let menuScreen = document.getElementById('menu-screen');

// ========== ESTADO DO JOGO ==========
let gameState = {
    selectedDeck: null,
    // selectedAmulet: null, // Comentado temporariamente
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
    // gameState.selectedAmulet = null; // Comentado temporariamente
    resetModalSelections();
}

// Fechar modal de seleção
function closeDeckSelectionModal() {
    deckSelectionModal.classList.remove('active');
}

// Resetar seleções do modal
function resetModalSelections() {
    document.querySelectorAll('.deck-option').forEach(option => {
        option.classList.remove('selected');
    });
    // Comentado temporariamente
    /*document.querySelectorAll('.amulet-option').forEach(option => {
        option.classList.remove('selected');
    });*/
}

// Selecionar deck
function selectDeck(deckNumber) {
    document.querySelectorAll('.deck-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-deck="${deckNumber}"]`).classList.add('selected');
    gameState.selectedDeck = deckNumber;
}

// Animação de compra de carta
async function animateDrawCard(from, to, delay = 0) {
    return new Promise(resolve => {
        const card = document.createElement('div');
        card.className = 'card-animation';
        
        // Posição inicial
        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();
        
        // Calcular o ponto médio para o arco da animação
        const midX = (fromRect.left + toRect.left) / 2;
        const midY = Math.min(fromRect.top, toRect.top) - 100; // Arco para cima
        console.log("inicio");
        card.style.top = `${fromRect.top}px`;
        card.style.left = `${fromRect.left}px`;
        card.style.transition = 'none';
        
        document.body.appendChild(card);
        
        // Força um reflow para garantir que a transição inicial seja aplicada
        card.getBoundingClientRect();
        
        // Adiciona um pequeno delay aleatório para tornar a animação mais natural
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            console.log("settimeout");
            
            // Primeira parte da animação - subindo em arco
            card.style.transform = `translate(${midX - fromRect.left}px, ${midY - fromRect.top}px) rotate(180deg)`;
            
            setTimeout(() => {
                // Segunda parte da animação - descendo para a posição final
                card.style.transform = `translate(${toRect.left - fromRect.left}px, ${toRect.top - fromRect.top + 70}px) rotate(360deg)`;
                
                card.addEventListener('transitionend', () => {
                    card.remove();
                    resolve();
                }, { once: true });
            }, 250);
        }, delay);
    });
}

// Função para comprar cartas até ter 5 na mão
async function drawCardsUntilFull() {
        console.log("drawCardsUntilFull");
    const cardsNeeded = 5 - gameState.playerHand.length;
    
    if (cardsNeeded <= 0) return;
    
    for (let i = 0; i < cardsNeeded; i++) {
        if (gameState.playerDeck.length > 0) {
            const card = gameState.playerDeck.shift();
            gameState.playerHand.push(card);
            await animateDrawCard(playerDeckElement, playerHandContainer, 1);
        }
    }
    
    updateDeckCounts();
    displayPlayerHand();
}

// Inicializar o jogo
async function initializeGame() {
    if (!gameState.selectedDeck) {
        alert('Por favor, selecione um deck!');
        return;
    }
    // Verificação do amuleto comentada temporariamente
    /*if (!gameState.selectedAmulet) {
        alert('Por favor, selecione um amuleto!');
        return;
    }*/

    closeDeckSelectionModal();

    // Criar os baralhos
    gameState.playerDeck = shuffleArray(createDeck(gameState.selectedDeck));
    gameState.opponentDeck = shuffleArray(createDeck('opponent'));
    gameState.centralDeck = shuffleArray(createDeck('central'));

    // Atualizar contadores dos decks
    updateDeckCounts();

    // Transição para tela de jogo
    changeScreen(menuScreen, gameScreen);

    // Espera a transição das portas terminar (3 segundos) + 2 segundos adicionais
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Revelar primeira carta do baralho central
    gameState.revealedCard = gameState.centralDeck.shift();
    displayCentralBoard();

    // Inicia o jogo
    gameState.gameStarted = true;
    
    // Compra as cartas iniciais com animação
    await drawCardsUntilFull();
    
    // Adiciona listener para auto-compra quando necessário
    setInterval(() => {
        if (gameState.gameStarted && gameState.playerHand.length < 5) {
            drawCardsUntilFull();
        }
    }, 1000);
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
        cardElement.classList.add('hand-card');
        cardElement.dataset.index = index;
        cardElement.style.backgroundImage = `url(${card.image})`;
        cardElement.title = card.name;
        
        // Adiciona a carta já selecionada se estiver no array de selecionadas
        if (gameState.playerSelectedCards.includes(index)) {
            cardElement.classList.add('selected');
        }
        
        cardElement.addEventListener('click', () => toggleCardSelection(index, cardElement));
        
        // Adiciona um pequeno delay na entrada de cada carta
        setTimeout(() => {
            playerHandContainer.appendChild(cardElement);
        }, index * 50);
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
            
            // Adiciona som de seleção (opcional)
            // playCardSelectSound();
        }
    } else {
        gameState.playerSelectedCards.splice(cardIndex, 1);
        cardElement.classList.remove('selected');
    }
    
    updateConfirmButton();
}

// Atualizar contadores dos decks
function updateDeckCounts() {
    // Atualizar contador do deck do jogador
    const playerDeckCount = document.querySelector('.player-bottom-deck .deck-count');
    if (playerDeckCount) {
        playerDeckCount.textContent = gameState.playerDeck.length;
    }

    // Atualizar contador do deck do oponente
    const opponentDeckCount = document.querySelector('.opponent-deck .deck-count');
    if (opponentDeckCount) {
        opponentDeckCount.textContent = gameState.opponentDeck.length;
    }
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
    console.log("clickar abre modal");
    openDeckSelectionModal();
});

// Seleção de deck
document.querySelectorAll('.deck-option').forEach(option => {
    option.addEventListener('click', () => {
        selectDeck(option.dataset.deck);
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