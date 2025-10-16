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
    
    // Para teste: seleciona automaticamente o primeiro deck e amuleto
    setTimeout(() => {
        const firstDeck = document.querySelector('.deck-option[data-deck="1"]');
        const firstAmulet = document.querySelector('.amulet-option[data-amulet="amulet1"]');
        
        if (firstDeck) {
            firstDeck.classList.add('selected');
            gameState.selectedDeck = '1';
        }
        
        if (firstAmulet) {
            firstAmulet.classList.add('selected');
            gameState.selectedAmulet = 'amulet1';
        }
        
        updateSelectionStatus();
    }, 100);
}

// Fechar modal de seleção
function closeDeckSelectionModal() {
    if (deckSelectionModal) {
        // Primeiro reseta as seleções
        resetModalSelections();
        
        // Remove a classe active com uma pequena animação
        deckSelectionModal.style.opacity = '0';
        
        // Espera a animação terminar antes de esconder o modal
        setTimeout(() => {
            deckSelectionModal.classList.remove('active');
            deckSelectionModal.style.opacity = '';
        }, 300);
        
        // Reseta o estado do jogo relacionado ao modal
        gameState.selectedDeck = null;
        gameState.selectedAmulet = null;
    }
}

// Resetar seleções do modal
function resetModalSelections() {
    // Remove a seleção visual dos decks e amuletos
    document.querySelectorAll('.deck-option, .amulet-option').forEach(option => {
        option.classList.remove('selected');
        // Remove qualquer estilo inline que possa ter sido adicionado
        option.style.border = '';
        option.style.transform = '';
    });
    
    // Reseta o estado de seleção
    gameState.selectedDeck = null;
    gameState.selectedAmulet = null;
    
    // Reseta qualquer feedback visual adicional que possa existir
    const modalContent = deckSelectionModal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.querySelectorAll('.error-message').forEach(msg => msg.remove());
    }
}

// Selecionar deck
function selectDeck(deckNumber) {
    // Remove seleção anterior
    document.querySelectorAll('.deck-option').forEach(option => {
        option.classList.remove('selected');
        option.style.transform = '';
    });
    
    // Adiciona nova seleção
    const selectedDeck = document.querySelector(`[data-deck="${deckNumber}"]`);
    if (selectedDeck) {
        selectedDeck.classList.add('selected');
        selectedDeck.style.transform = 'translateY(-5px) scale(1.05)';
        gameState.selectedDeck = deckNumber;
        
        // Atualiza feedback visual
        updateSelectionStatus();
    }
}

// Selecionar amuleto
function selectAmulet(amuletId) {
    // Remove seleção anterior
    document.querySelectorAll('.amulet-option').forEach(option => {
        option.classList.remove('selected');
        option.style.transform = '';
    });
    
    // Adiciona nova seleção
    const selectedAmulet = document.querySelector(`[data-amulet="${amuletId}"]`);
    if (selectedAmulet) {
        selectedAmulet.classList.add('selected');
        selectedAmulet.style.transform = 'translateY(-5px) scale(1.05)';
        gameState.selectedAmulet = amuletId;
        
        // Atualiza feedback visual
        updateSelectionStatus();
    }
}

//Função auxiliar para atualizar o status da seleção
function updateSelectionStatus() {
    const btnConfirm = document.getElementById('btn-confirm-selection');
    if (btnConfirm) {
        // Para teste: sempre habilita o botão
        btnConfirm.removeAttribute('disabled');
        btnConfirm.style.opacity = '1';
        
        // Define valores padrão para teste se nada estiver selecionado
        if (!gameState.selectedDeck) {
            gameState.selectedDeck = '1'; // Seleciona o primeiro deck por padrão
        }
        if (!gameState.selectedAmulet) {
            gameState.selectedAmulet = 'amulet1'; // Seleciona o primeiro amuleto por padrão
        }
    }
    
    // Remove mensagens de erro anteriores
    const errorMessages = document.querySelectorAll('.selection-error');
    errorMessages.forEach(msg => msg.remove());
    
    // Mostra o progresso da seleção
    const modalContent = deckSelectionModal.querySelector('.modal-content');
    if (modalContent) {
        const statusText = document.createElement('div');
        statusText.className = 'selection-status';
        statusText.style.color = '#fff';
        statusText.style.marginTop = '10px';
        statusText.innerHTML = `
            Deck: ${gameState.selectedDeck ? '✅' : '❌'}<br>
            Amuleto: ${gameState.selectedAmulet ? '✅' : '❌'}
        `;
        
        // Remove status anterior se existir
        const oldStatus = modalContent.querySelector('.selection-status');
        if (oldStatus) oldStatus.remove();
        
        modalContent.appendChild(statusText);
    }
}

// Inicializar o jogo
function initializeGame() {
    // Validação da seleção
    if (!gameState.selectedDeck || !gameState.selectedAmulet) {
        const modalContent = deckSelectionModal.querySelector('.modal-content');
        
        // Remove mensagens de erro anteriores
        modalContent.querySelectorAll('.error-message').forEach(msg => msg.remove());
        
        // Adiciona mensagem de erro
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.color = '#ff4444';
        errorMessage.style.marginTop = '10px';
        errorMessage.innerHTML = '⚠️ Por favor, selecione um deck e um amuleto para continuar!';
        modalContent.appendChild(errorMessage);
        
        // Efeito de shake no modal
        modalContent.style.animation = 'shake 0.5s';
        setTimeout(() => modalContent.style.animation = '', 500);
        return;
    }

    // Fecha o modal com animação
    closeDeckSelectionModal();

    // Inicia animação de carregamento
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">Preparando o jogo...</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Usa setTimeout para dar tempo para a animação do modal fechar
    setTimeout(() => {
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

        // Remove o overlay de carregamento e muda para a tela do jogo
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
                menuScreen.classList.remove('active');
                gameScreen.classList.add('active');
            }, 500);
        }, 1000);
    }, 500);
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

document.addEventListener('DOMContentLoaded', () => {
    // Event listeners só serão adicionados após o DOM estar completamente carregado
    const deckOptions = document.querySelectorAll('.deck-option');
    const amuletOptions = document.querySelectorAll('.amulet-option');
    
    // Adiciona evento para fechar o modal ao clicar no overlay
    
    if (deckSelectionModal) {
        const modalOverlay = deckSelectionModal.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeDeckSelectionModal();
                }
            });
        }
    }
    
    if (btnConfirmSelection) {
        btnConfirmSelection.addEventListener('click', () => {
            console.log('Confirm button clicked'); // Debug log
            initializeGame();
        });
    }
    
    if (btnCancelSelection) {
        btnCancelSelection.addEventListener('click', closeDeckSelectionModal);
    }
    
    deckOptions.forEach(option => {
        option.addEventListener('click', () => {
            const deckNumber = option.dataset.deck;
            selectDeck(deckNumber);
            
            // Adiciona efeito sonoro (opcional)
            const selectSound = new Audio('../sounds/select.mp3');
            selectSound.volume = 0.5;
            selectSound.play().catch(() => {}); // Ignora erro se o som não existir
        });
        
        // Adiciona efeito hover
        option.addEventListener('mouseenter', () => {
            if (!option.classList.contains('selected')) {
                option.style.transform = 'translateY(-3px)';
            }
        });
        
        option.addEventListener('mouseleave', () => {
            if (!option.classList.contains('selected')) {
                option.style.transform = '';
            }
        });
    });
    
    amuletOptions.forEach(option => {
        option.addEventListener('click', () => {
            const amuletId = option.dataset.amulet;
            selectAmulet(amuletId);
            
            // Adiciona efeito sonoro (opcional)
            const selectSound = new Audio('../sounds/select.mp3');
            selectSound.volume = 0.5;
            selectSound.play().catch(() => {}); // Ignora erro se o som não existir
        });
        
        // Adiciona efeito hover
        option.addEventListener('mouseenter', () => {
            if (!option.classList.contains('selected')) {
                option.style.transform = 'translateY(-3px)';
            }
        });
        
        option.addEventListener('mouseleave', () => {
            if (!option.classList.contains('selected')) {
                option.style.transform = '';
            }
        });
    });
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