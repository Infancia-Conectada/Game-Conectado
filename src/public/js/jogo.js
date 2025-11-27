// ========== SISTEMA DE JOGO COMPLETO ==========

// Instância do motor do jogo
let gameEngine = null;
let selectedDeckNumber = null;
let currentBattleResult = null;

// ========== MODAL DE SELEÇÃO DE DECK ==========

// Abrir modal de seleção
function openDeckSelectionModal() {
    deckSelectionModal.classList.add('active');
    selectedDeckNumber = null;
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
}

// Selecionar deck
function selectDeck(deckNumber) {
    document.querySelectorAll('.deck-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-deck="${deckNumber}"]`).classList.add('selected');
    selectedDeckNumber = deckNumber;
}

// ========== INICIALIZAÇÃO DO JOGO ==========

// Inicializar o jogo
async function initializeGame() {
    if (!selectedDeckNumber) {
        alert('Por favor, selecione um deck!');
        return;
    }

    closeDeckSelectionModal();

    // Buscar dados do deck do servidor
    try {
        const response = await fetch(`/api/deck/${selectedDeckNumber}`);
        const data = await response.json();

        // Criar nova instância do motor do jogo
        gameEngine = new GameEngine();
        
        // Transição para tela de jogo
        await changeScreen(menuScreen, gameScreen);

        // Espera a transição das portas terminar
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Inicializar o jogo com os dados do deck
        gameEngine.initializeGame(data.deckCards);

        // Atualizar interface inicial
        updateGameUI();
        
        // Comprar cartas iniciais com animação
        await animateInitialDraw();
        
        // Iniciar o primeiro turno após compra de cartas
        gameEngine.startNewTurn();
        updateGameUI();

    } catch (error) {
        console.error('Erro ao inicializar jogo:', error);
        alert('Erro ao carregar o deck. Tente novamente.');
    }
}

// Animar compra inicial de cartas
async function animateInitialDraw() {
    const state = gameEngine.getGameState();
    
    for (let i = 0; i < state.playerHand.length; i++) {
        await animateDrawCard(playerDeckElement, playerHandContainer, i * 100);
    }
    
    // Atualizar mão após animações
    displayPlayerHand();
}

// ========== ANIMAÇÕES ==========

// Animação de compra de carta
async function animateDrawCard(from, to, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'card-animation';
            
            const fromRect = from.getBoundingClientRect();
            const toRect = to.getBoundingClientRect();
            
            const midX = (fromRect.left + toRect.left) / 2;
            const midY = Math.min(fromRect.top, toRect.top) - 100;
            
            card.style.top = `${fromRect.top}px`;
            card.style.left = `${fromRect.left}px`;
            card.style.transition = 'none';
            
            document.body.appendChild(card);
            card.getBoundingClientRect();
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = `translate(${midX - fromRect.left}px, ${midY - fromRect.top}px) rotate(180deg)`;
                
                setTimeout(() => {
                    card.style.transform = `translate(${toRect.left - fromRect.left}px, ${toRect.top - fromRect.top + 70}px) rotate(360deg)`;
                    
                    card.addEventListener('transitionend', () => {
                        card.remove();
                        resolve();
                    }, { once: true });
                }, 250);
            }, 50);
        }, delay);
    });
}

// ========== INTERFACE DO JOGO ==========

// Atualizar toda a UI do jogo
function updateGameUI() {
    const state = gameEngine.getGameState();
    
    updateScoreDisplay();
    displayCentralBoard();
    displayPlayerHand();
    updateConfirmButton();
}

// Exibir baralho central (cenário)
function displayCentralBoard() {
    const state = gameEngine.getGameState();
    
    if (state.currentScenario) {
        // Mapear ID do cenário para imagem
        const scenarioImages = {
            1: '../img/cenarios/1-AGA.png',
            2: '../img/cenarios/1-ELT.png',
            3: '../img/cenarios/1-FGO.png',
            4: '../img/cenarios/1-TER.png',
            5: '../img/cenarios/1-AGA.png',
            6: '../img/cenarios/1-ELT.png',
            7: '../img/cenarios/1-FGO.png',
            8: '../img/cenarios/1-TER.png',
            9: '../img/cenarios/2-AGA+TER.png',
            10: '../img/cenarios/2-FGO+ELT.png',
            11: '../img/cenarios/2-NEBLINA.png',
            12: '../img/cenarios/2-NEBLINA.png'
        };
        
        revealedCardSlot.style.backgroundImage = `url(${scenarioImages[state.currentScenario.id]})`;
        revealedCardSlot.textContent = '';
        
        // Atualizar background do jogo conforme o cenário
        updateGameBackground(state.currentScenario.id);
    }
}

// Atualizar background do jogo conforme cenário
function updateGameBackground(scenarioId) {
    // Mapear ID do cenário para imagem de background
    const backgroundImages = {
        1: '../img/background/JOGAR-AGUA.png',           // Ilha
        2: '../img/background/JOGAR-RAIO.png',           // Deserto Estático
        3: '../img/background/JOGAR-FOGO.png',           // Vale Vulcânico
        4: '../img/background/JOGAR-TERRA.png',          // Floresta
        5: '../img/background/JOGAR-AGUA.png',           // Ilha
        6: '../img/background/JOGAR-RAIO.png',           // Deserto Estático
        7: '../img/background/JOGAR-FOGO.png',           // Vale Vulcânico
        8: '../img/background/JOGAR-TERRA.png',          // Floresta
        9: '../img/background/JOGAR-AGUA-TERRA.png',     // Pântano
        10: '../img/background/JOGAR-FOGO-RAIO.png',      // Cerrado Vulcânico
        11: '../img/background/JOGAR-NEBLINA.png',         // Neblina
        12: '../img/background/JOGAR-NEBLINA.png'         // Neblina
    };
    
    const bgImage = document.querySelector('.bg-image');
    if (bgImage && backgroundImages[scenarioId]) {
        bgImage.src = backgroundImages[scenarioId];
    }
}

// Exibir mão do jogador
function displayPlayerHand() {
    const state = gameEngine.getGameState();
    playerHandContainer.innerHTML = '';
    
    state.playerHand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('hand-card');
        cardElement.dataset.index = index;
        cardElement.dataset.cardId = card.id || card.id_carta;
        cardElement.dataset.cardType = card.cardType;
        
        // Usar a imagem da carta
        cardElement.style.backgroundImage = `url(${card.img_url})`;
        cardElement.title = `${card.nome} (${card.elemento})`;
        
        // Verificar se a carta está selecionada
        const isMonsterSelected = state.playerSelection.monster === card;
        const isItemSelected = state.playerSelection.item === card;
        
        if (isMonsterSelected || isItemSelected) {
            cardElement.classList.add('selected');
        }
        
        cardElement.addEventListener('click', () => handleCardClick(index, card));
        
        playerHandContainer.appendChild(cardElement);
    });
}

// Manipular clique em carta
function handleCardClick(index, card) {
    const state = gameEngine.getGameState();
    
    if (state.turnPhase !== 'selecting') {
        return;
    }
    
    // Se a carta já está selecionada, desselecionar
    if (state.playerSelection.monster === card) {
        gameEngine.deselectCard('monster');
    } else if (state.playerSelection.item === card) {
        gameEngine.deselectCard('item');
    } else {
        // Selecionar a carta
        gameEngine.selectCard(index);
    }
    
    // Atualizar interface
    displayPlayerHand();
    updateConfirmButton();
}

// Atualizar exibição de pontuação
function updateScoreDisplay() {
    const state = gameEngine.getGameState();
    
    // Criar elementos de pontuação se não existirem
    let playerScoreEl = document.getElementById('player-score');
    let opponentScoreEl = document.getElementById('opponent-score');
    
    if (!playerScoreEl) {
        playerScoreEl = document.createElement('div');
        playerScoreEl.id = 'player-score';
        playerScoreEl.className = 'score-display player-score';
        document.querySelector('.player-info-bottom').appendChild(playerScoreEl);
    }
    
    if (!opponentScoreEl) {
        opponentScoreEl = document.createElement('div');
        opponentScoreEl.id = 'opponent-score';
        opponentScoreEl.className = 'score-display opponent-score';
        document.querySelector('.opponent-info').appendChild(opponentScoreEl);
    }
    
    playerScoreEl.textContent = `⭐ ${state.playerScore}`;
    opponentScoreEl.textContent = `⭐ ${state.opponentScore}`;
}

// Atualizar botão de confirmação
function updateConfirmButton() {
    if (gameEngine && gameEngine.canConfirmPlay()) {
        confirmPlayButton.classList.remove('hidden');
    } else {
        confirmPlayButton.classList.add('hidden');
    }
}

// ========== SISTEMA DE BATALHA ==========

// Confirmar jogada e iniciar batalha
async function confirmPlay() {
    if (!gameEngine || !gameEngine.canConfirmPlay()) {
        return;
    }
    
    // Esconder botão de confirmação
    confirmPlayButton.classList.add('hidden');
    
    // Resolver batalha
    currentBattleResult = gameEngine.confirmPlay();
    
    // Mostrar animação de batalha
    await showBattleAnimation(currentBattleResult);
    
    // Mostrar resultado
    await showBattleResult(currentBattleResult);
    
    // Limpar mesa e preparar próximo turno
    gameEngine.endTurn();
    
    // Verificar se o jogo acabou
    if (currentBattleResult.gameWinner) {
        await showGameEndScreen(currentBattleResult.gameWinner);
    } else {
        // Atualizar interface para o próximo turno
        updateGameUI();
        
        // Animar compra de novas cartas
        await animateDrawNewCards();
    }
}

// Mostrar animação de batalha
async function showBattleAnimation(result) {
    // Criar overlay de batalha
    const battleOverlay = document.createElement('div');
    battleOverlay.className = 'battle-overlay';
    
    // Buscar cartas selecionadas
    const playerMonster = gameEngine.playerSelection.monster;
    const opponentMonster = gameEngine.opponentSelection.monster;
    
    battleOverlay.innerHTML = `
        <div class="battle-animation">
            <div class="battle-card player-battle-card">
                <img src="${playerMonster.img_url}" alt="${playerMonster.nome}">
                <div class="battle-stats">
                    <div>⚔️ ${result.playerStats.dano}</div>
                    <div>❤️ ${result.playerStats.vida}</div>
                </div>
            </div>
            <div class="battle-vs">VS</div>
            <div class="battle-card opponent-battle-card">
                <img src="${opponentMonster.img_url}" alt="${opponentMonster.nome}">
                <div class="battle-stats">
                    <div>⚔️ ${result.opponentStats.dano}</div>
                    <div>❤️ ${result.opponentStats.vida}</div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('game-screen').appendChild(battleOverlay);
    
    // Esperar animação
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    battleOverlay.remove();
}

// Mostrar resultado da batalha
async function showBattleResult(result) {
    const resultOverlay = document.createElement('div');
    resultOverlay.className = 'battle-result-overlay';
    
    let resultText = '';
    let resultClass = '';
    
    if (result.roundWinner === 'player') {
        resultText = '🏆 VOCÊ VENCEU O TURNO!';
        resultClass = 'victory';
    } else if (result.roundWinner === 'opponent') {
        resultText = '💀 OPONENTE VENCEU O TURNO!';
        resultClass = 'defeat';
    } else {
        resultText = '⚖️ EMPATE!';
        resultClass = 'draw';
    }
    
    resultOverlay.innerHTML = `
        <div class="battle-result ${resultClass}">
            <h2>${resultText}</h2>
            <div class="score-update">
                Placar: ${result.playerScore} x ${result.opponentScore}
            </div>
        </div>
    `;
    
    document.getElementById('game-screen').appendChild(resultOverlay);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    resultOverlay.remove();
}

// Animar compra de novas cartas
async function animateDrawNewCards() {
    const state = gameEngine.getGameState();
    const previousHandSize = state.playerHand.length;
    
    // Se comprou cartas novas, animar
    if (state.playerHand.length > previousHandSize) {
        for (let i = previousHandSize; i < state.playerHand.length; i++) {
            await animateDrawCard(playerDeckElement, playerHandContainer, 100);
        }
    }
    
    displayPlayerHand();
}

// Mostrar tela de fim de jogo
async function showGameEndScreen(winner) {
    const endOverlay = document.createElement('div');
    endOverlay.className = 'game-end-overlay';
    
    const isVictory = winner === 'player';
    const title = isVictory ? '🎉 VITÓRIA! 🎉' : '😢 DERROTA 😢';
    const message = isVictory ? 'Parabéns! Você venceu o jogo!' : 'Não desista! Tente novamente!';
    const coins = isVictory ? 100 : 50;
    
    endOverlay.innerHTML = `
        <div class="game-end-screen">
            <h1>${title}</h1>
            <p>${message}</p>
            <div class="coins-earned">
                <span>🪙 +${coins} moedas</span>
            </div>
            <div class="end-buttons">
                <button onclick="playAgain()" class="btn-play-again">Jogar Novamente</button>
                <button onclick="backToMenu()" class="btn-back-menu">Voltar ao Menu</button>
            </div>
        </div>
    `;
    
    document.getElementById('game-screen').appendChild(endOverlay);
}

// Jogar novamente
function playAgain() {
    location.reload();
}

// Voltar ao menu
async function backToMenu() {
    gameEngine = null;
    await changeScreen(gameScreen, menuScreen);
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

// Confirmar seleção de deck
btnConfirmSelection.addEventListener('click', () => {
    initializeGame();
});

// Cancelar seleção
btnCancelSelection.addEventListener('click', () => {
    closeDeckSelectionModal();
});

// Confirmar jogada
confirmPlayButton.addEventListener('click', () => {
    confirmPlay();
});