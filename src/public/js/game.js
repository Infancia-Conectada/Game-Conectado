// Estado do inventário
const inventoryData = {
    playerInventory: [], // Até 100 cartas
    playerDecks: [
        [], // Deck 1 (até 20 cartas)
        [], // Deck 2 (até 20 cartas)  
        []  // Deck 3 (até 20 cartas)
    ],
    currentDeck: 0, // Deck atualmente selecionado (0, 1 ou 2)
    selectedCard: null,
    selectedCardLocation: null, // 'deck' ou 'inventory'
    selectedCardIndex: -1,
    inventoryScrollOffset: 0
};

// Função para lidar com cliques no menu
function handleMenuClick(option) {
    console.log(`Clicou em: ${option}`);
    
    showDoorTransition(() => {
        switch(option) {
            case 'jogar':
                showGameScreen();
                break;
            case 'inventario':
                showInventoryScreen();
                break;
            case 'amuleto':
                console.log('Abrindo amuletos...');
                break;
            case 'loja':
                console.log('Abrindo loja...');
                break;
            case 'perfil':
                console.log('Abrindo perfil...');
                break;
            case 'tutorial':
                console.log('Abrindo tutorial...');
                break;
        }
    });
}

// Função para mostrar tela de inventário
function showInventoryScreen() {
    gameState = 'inventory';
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('inventoryScreen').style.display = 'block';
    document.getElementById('inventoryScreen').classList.add('active');
    
    // Inicializar inventário se necessário
    if (inventoryData.playerInventory.length === 0) {
        initializeInventory();
    }
    
    // Atualizar displays
    updateDeckDisplay();
    updateInventoryDisplay();
    updateActionButtons();
}

// Função para inicializar inventário com cartas de exemplo
function initializeInventory() {
    // Gerar algumas cartas de exemplo para o inventário
    const sampleCards = [
        {id: 1, name: 'Dragão Vermelho', type: 'monster', element: 'Fogo', attack: 6, health: 4, rarity: 'comum'},
        {id: 2, name: 'Golem de Pedra', type: 'monster', element: 'Terra', attack: 4, health: 6, rarity: 'comum'},
        {id: 3, name: 'Espírito do Raio', type: 'monster', element: 'Raio', attack: 5, health: 3, rarity: 'raro'},
        {id: 4, name: 'Leviatã Azul', type: 'monster', element: 'Agua', attack: 4, health: 5, rarity: 'comum'},
        {id: 5, name: 'Fênix Dourada', type: 'monster', element: 'Fogo', attack: 7, health: 3, rarity: 'épico'},
        {id: 6, name: 'Urso da Terra', type: 'monster', element: 'Terra', attack: 5, health: 5, rarity: 'comum'},
        {id: 7, name: 'Espada Flamejante', type: 'item', effect: '+2 ATK', attackBuff: 2, defenseBuff: 0, rarity: 'comum'},
        {id: 8, name: 'Escudo Mágico', type: 'item', effect: '+2 DEF', attackBuff: 0, defenseBuff: 2, rarity: 'comum'},
        {id: 9, name: 'Poção de Força', type: 'item', effect: '+1 ATK +1 DEF', attackBuff: 1, defenseBuff: 1, rarity: 'raro'},
        {id: 10, name: 'Armadura Pesada', type: 'item', effect: '+3 DEF', attackBuff: 0, defenseBuff: 3, rarity: 'épico'}
    ];
    
    // Adicionar múltiplas cópias das cartas ao inventário (simulando 50 cartas)
    for (let i = 0; i < 50; i++) {
        const baseCard = sampleCards[i % sampleCards.length];
        inventoryData.playerInventory.push({
            ...baseCard,
            uniqueId: `inv_${i}`,
            instanceId: i
        });
    }
    
    // Adicionar algumas cartas ao deck 1 como exemplo
    for (let i = 0; i < 15; i++) {
        const baseCard = sampleCards[i % sampleCards.length];
        inventoryData.playerDecks[0].push({
            ...baseCard,
            uniqueId: `deck1_${i}`,
            instanceId: i + 1000
        });
    }
}

// Função para atualizar display do deck
function updateDeckDisplay() {
    const deckGrid = document.getElementById('deckGrid');
    deckGrid.innerHTML = '';
    
    const currentDeckCards = inventoryData.playerDecks[inventoryData.currentDeck];
    
    // Criar 20 slots para o deck
    for (let i = 0; i < 20; i++) {
        const slot = document.createElement('div');
        slot.className = 'deck-slot';
        
        if (i < currentDeckCards.length) {
            const card = currentDeckCards[i];
            slot.classList.add('occupied');
            
            const cardIcon = document.createElement('div');
            cardIcon.className = `card-icon ${card.type}`;
            cardIcon.textContent = card.name.substring(0, 3);
            slot.appendChild(cardIcon);
            
            slot.onclick = () => selectCard(card, 'deck', i);
        } else {
            slot.innerHTML = '<div style="color: #666; font-size: 12px;">Vazio</div>';
        }
        
        deckGrid.appendChild(slot);
    }
}

// Função para atualizar display do inventário
function updateInventoryDisplay() {
    const inventoryGrid = document.getElementById('inventoryGrid');
    inventoryGrid.innerHTML = '';
    
    // Calcular cartas visíveis (6 colunas x múltiplas linhas)
    const cardsPerPage = 24; // 6 x 4 linhas visíveis
    const startIndex = inventoryData.inventoryScrollOffset * 6;
    const endIndex = Math.min(startIndex + cardsPerPage, inventoryData.playerInventory.length);
    
    // Criar slots para as cartas visíveis
    for (let i = startIndex; i < startIndex + cardsPerPage; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';
        
        if (i < inventoryData.playerInventory.length) {
            const card = inventoryData.playerInventory[i];
            slot.classList.add('occupied');
            
            const cardIcon = document.createElement('div');
            cardIcon.className = `card-icon ${card.type}`;
            cardIcon.textContent = card.name.substring(0, 3);
            slot.appendChild(cardIcon);
            
            slot.onclick = () => selectCard(card, 'inventory', i);
        } else {
            slot.innerHTML = '<div style="color: #666; font-size: 10px;">Vazio</div>';
        }
        
        inventoryGrid.appendChild(slot);
    }
}

// Função para selecionar carta
function selectCard(card, location, index) {
    // Remover seleção anterior
    document.querySelectorAll('.deck-slot.selected, .inventory-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Definir nova seleção
    inventoryData.selectedCard = card;
    inventoryData.selectedCardLocation = location;
    inventoryData.selectedCardIndex = index;
    
    // Adicionar classe de seleção visual
    const selector = location === 'deck' ? '.deck-slot' : '.inventory-slot';
    const slots = document.querySelectorAll(selector);
    const relativeIndex = location === 'inventory' ? 
        index - (inventoryData.inventoryScrollOffset * 6) : 
        index;
    
    if (slots[relativeIndex]) {
        slots[relativeIndex].classList.add('selected');
    }
    
    // Atualizar preview da carta
    updateCardPreview(card);
    
    // Atualizar botões de ação
    updateActionButtons();
}

// Função para atualizar preview da carta selecionada
function updateCardPreview(card) {
    const preview = document.getElementById('cardPreview');
    
    if (!card) {
        preview.innerHTML = '<div class="preview-placeholder">Selecione uma carta para visualizar</div>';
        return;
    }
    
    preview.innerHTML = `
        <div class="card-preview-content">
            <h3>${card.name}</h3>
            <div class="card-type">${card.type === 'monster' ? 'Monstro' : 'Item'}</div>
            ${card.element ? `<div class="card-element">Elemento: ${card.element}</div>` : ''}
            ${card.type === 'monster' ? 
                `<div class="card-stats">ATK: ${card.attack} | HP: ${card.health}</div>` : 
                `<div class="card-stats">${card.effect}</div>`
            }
            <div class="card-description">
                Raridade: ${card.rarity || 'Comum'}<br>
                ID: ${card.instanceId}
            </div>
        </div>
    `;
}

// Função para atualizar botões de ação
function updateActionButtons() {
    const addRemoveBtn = document.getElementById('addRemoveBtn');
    const recycleBtn = document.getElementById('recycleBtn');
    
    if (!inventoryData.selectedCard) {
        // Nenhuma carta selecionada
        addRemoveBtn.disabled = true;
        addRemoveBtn.textContent = 'SELECIONE';
        recycleBtn.disabled = true;
    } else if (inventoryData.selectedCardLocation === 'deck') {
        // Carta do deck selecionada
        addRemoveBtn.disabled = false;
        addRemoveBtn.textContent = 'REMOVER';
        recycleBtn.disabled = false;
    } else {
        // Carta do inventário selecionada
        const currentDeck = inventoryData.playerDecks[inventoryData.currentDeck];
        const canAddToDeck = currentDeck.length < 20;
        
        addRemoveBtn.disabled = !canAddToDeck;
        addRemoveBtn.textContent = canAddToDeck ? 'ADICIONAR' : 'DECK CHEIO';
        recycleBtn.disabled = false;
    }
}

// Função para lidar com adicionar/remover carta
function handleAddRemove() {
    if (!inventoryData.selectedCard) return;
    
    if (inventoryData.selectedCardLocation === 'deck') {
        // Remover carta do deck
        removeCardFromDeck();
    } else {
        // Adicionar carta ao deck
        addCardToDeck();
    }
}

// Função para adicionar carta ao deck
function addCardToDeck() {
    const currentDeck = inventoryData.playerDecks[inventoryData.currentDeck];
    
    if (currentDeck.length >= 20) {
        alert('O deck já está cheio (máximo 20 cartas)!');
        return;
    }
    
    // Mover carta do inventário para o deck
    const card = inventoryData.playerInventory.splice(cardIndex, 1)[0];
    currentDeck.push(card);
    
    // Limpar seleção
    clearSelection();
    
    // Atualizar displays
    updateDeckDisplay();
    updateInventoryDisplay();
    updateActionButtons();
    
    console.log('Carta adicionada ao deck:', card.name);
}

// Função para remover carta do deck
function removeCardFromDeck() {
    const currentDeck = inventoryData.playerDecks[inventoryData.currentDeck];
    const cardIndex = inventoryData.selectedCardIndex;
    
    // Mover carta do deck para o inventário
    const card = currentDeck.splice(cardIndex, 1)[0];
    inventoryData.playerInventory.push(card);
    
    // Limpar seleção
    clearSelection();
    
    // Atualizar displays
    updateDeckDisplay();
    updateInventoryDisplay();
    updateActionButtons();
    
    console.log('Carta removida do deck:', card.name);
}

// Função para lidar com reciclagem de carta
function handleRecycle() {
    if (!inventoryData.selectedCard) return;
    
    // Calcular moedas baseado na raridade
    const recycleValue = calculateRecycleValue(inventoryData.selectedCard);
    
    // Mostrar modal de confirmação
    document.getElementById('recycleCoins').textContent = recycleValue;
    document.getElementById('recycleModal').classList.add('active');
}

// Função para calcular valor de reciclagem
function calculateRecycleValue(card) {
    const rarityValues = {
        'comum': 5,
        'raro': 15,
        'épico': 35,
        'lendário': 75
    };
    
    return rarityValues[card.rarity] || 5;
}

// Função para confirmar reciclagem
function confirmRecycle() {
    if (!inventoryData.selectedCard) return;
    
    const recycleValue = calculateRecycleValue(inventoryData.selectedCard);
    
    if (inventoryData.selectedCardLocation === 'deck') {
        // Remover do deck
        const currentDeck = inventoryData.playerDecks[inventoryData.currentDeck];
        currentDeck.splice(inventoryData.selectedCardIndex, 1);
    } else {
        // Remover do inventário
        inventoryData.playerInventory.splice(inventoryData.selectedCardIndex, 1);
    }
    
    // Adicionar moedas
    gameData.playerCoins += recycleValue;
    
    console.log(`Carta reciclada: ${inventoryData.selectedCard.name} por ${recycleValue} moedas`);
    
    // Limpar seleção
    clearSelection();
    
    // Fechar modal
    closeRecycleModal();
    
    // Atualizar displays
    updateDeckDisplay();
    updateInventoryDisplay();
    updateActionButtons();
}

// Função para fechar modal de reciclagem
function closeRecycleModal() {
    document.getElementById('recycleModal').classList.remove('active');
}

// Função para limpar seleção
function clearSelection() {
    inventoryData.selectedCard = null;
    inventoryData.selectedCardLocation = null;
    inventoryData.selectedCardIndex = -1;
    
    // Remover classes visuais de seleção
    document.querySelectorAll('.deck-slot.selected, .inventory-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Limpar preview
    updateCardPreview(null);
}

// Função para fazer scroll no inventário
function scrollInventory(direction) {
    const maxOffset = Math.max(0, Math.ceil(inventoryData.playerInventory.length / 6) - 4);
    
    inventoryData.inventoryScrollOffset += direction;
    inventoryData.inventoryScrollOffset = Math.max(0, Math.min(maxOffset, inventoryData.inventoryScrollOffset));
    
    updateInventoryDisplay();
    
    // Se havia uma carta selecionada do inventário, limpar seleção
    if (inventoryData.selectedCardLocation === 'inventory') {
        clearSelection();
        updateActionButtons();
    }
}

// Função para voltar ao menu
function returnToMenu() {
    showDoorTransition(() => {
        // Esconder tela de inventário
        document.getElementById('inventoryScreen').style.display = 'none';
        document.getElementById('inventoryScreen').classList.remove('active');
        
        // Mostrar menu principal
        document.getElementById('mainMenu').style.display = 'block';
        document.getElementById('mainMenu').classList.add('active');
        
        gameState = 'menu';
        
        // Limpar seleção
        clearSelection();
    });
}

// Função para mostrar tela do jogo
function showGameScreen() {
    gameState = 'game';
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('gameScreen').classList.add('active');
    document.getElementById('deckSelection').classList.add('active');
    
    // Atualizar status
    document.getElementById('gameStatus').textContent = 'PRE-JOGAR';
}

// Função para confirmar seleção de deck
function confirmDeckSelection() {
    // Esconder seleção de deck
    document.getElementById('deckSelection').classList.remove('active');
    
    // Tirar blur da mesa
    document.getElementById('gameTable').classList.add('active');
    
    // Atualizar status para JOGAR
    document.getElementById('gameStatus').textContent = 'JOGAR';
    
    // Inicializar jogo
    initializeGame();
}

// Função para inicializar o jogo
function initializeGame() {
    // Resetar dados do jogo
    gameData.playerScore = 0;
    gameData.aiScore = 0;
    gameData.playerHand = [];
    gameData.aiHand = [];
    gameData.playerDiscard = [];
    gameData.aiDiscard = [];
    gameData.scenarioDiscard = [];
    gameData.selectedPlayerMonster = null;
    gameData.selectedPlayerItem = null;
    gameData.selectedAIMonster = null;
    gameData.selectedAIItem = null;
    
    // Usar deck do jogador do inventário (deck atual selecionado)
    gameData.playerDeck = [...inventoryData.playerDecks[inventoryData.currentDeck]];
    
    // Se o deck estiver vazio ou incompleto, usar deck padrão
    if (gameData.playerDeck.length < 20) {
        console.log('Deck incompleto, usando deck padrão');
        gameData.playerDeck = generatePlayerDeck();
    }
    
    // Gerar deck da IA
    gameData.aiDeck = generateAIDeck();
    
    // Gerar deck de cenários
    gameData.scenarioDeck = generateScenarioDeck();
    
    // Embaralhar decks
    shuffleDeck(gameData.playerDeck);
    shuffleDeck(gameData.aiDeck);
    shuffleDeck(gameData.scenarioDeck);
    
    // Comprar cartas iniciais (5 cartas cada)
    drawInitialCards();
    
    // Começar primeiro turno
    startNewTurn();
}

// Função para gerar deck do jogador (fallback se não tiver deck completo)
function generatePlayerDeck() {
    const monsters = [
        {id: 1, name: 'Dragão Vermelho', type: 'monster', element: 'Fogo', attack: 6, health: 4},
        {id: 2, name: 'Golem de Pedra', type: 'monster', element: 'Terra', attack: 4, health: 6},
        {id: 3, name: 'Espírito do Raio', type: 'monster', element: 'Raio', attack: 5, health: 3},
        {id: 4, name: 'Leviatã Azul', type: 'monster', element: 'Agua', attack: 4, health: 5},
        {id: 5, name: 'Fênix Dourada', type: 'monster', element: 'Fogo', attack: 7, health: 3},
        {id: 6, name: 'Urso da Terra', type: 'monster', element: 'Terra', attack: 5, health: 5}
    ];
    
    const items = [
        {id: 7, name: 'Espada Flamejante', type: 'item', effect: '+2 ATK', attackBuff: 2, defenseBuff: 0},
        {id: 8, name: 'Escudo Mágico', type: 'item', effect: '+2 DEF', attackBuff: 0, defenseBuff: 2},
        {id: 9, name: 'Poção de Força', type: 'item', effect: '+1 ATK +1 DEF', attackBuff: 1, defenseBuff: 1},
        {id: 10, name: 'Armadura Pesada', type: 'item', effect: '+3 DEF', attackBuff: 0, defenseBuff: 3}
    ];
    
    const deck = [];
    
    // Adicionar 12 monstros
    for (let i = 0; i < 12; i++) {
        deck.push({...monsters[i % monsters.length], uniqueId: `m_${i}`});
    }
    
    // Adicionar 8 itens
    for (let i = 0; i < 8; i++) {
        deck.push({...items[i % items.length], uniqueId: `i_${i}`});
    }
    
    return deck;
}

// Função para gerar deck da IA
function generateAIDeck() {
    // Usar o mesmo padrão do jogador por enquanto
    return generatePlayerDeck();
}

// Função para gerar deck de cenários
function generateScenarioDeck() {
    return [
        {id: 1, name: 'Campo de Batalha', effect: 'Todos +1 ATK', attackBuff: 1, defenseBuff: 0},
        {id: 2, name: 'Fortaleza', effect: 'Todos +1 DEF', attackBuff: 0, defenseBuff: 1},
        {id: 3, name: 'Tempestade', effect: 'Raio +2 ATK', elementBuff: {Raio: 2}},
        {id: 4, name: 'Vulcão', effect: 'Fogo +2 ATK', elementBuff: {Fogo: 2}},
        {id: 5, name: 'Oceano', effect: 'Agua +2 ATK', elementBuff: {Agua: 2}},
        {id: 6, name: 'Montanha', effect: 'Terra +2 ATK', elementBuff: {Terra: 2}},
        {id: 7, name: 'Cemitério', effect: 'Todos -1 ATK', attackBuff: -1, defenseBuff: 0},
        {id: 8, name: 'Templo', effect: 'Todos +2 DEF', attackBuff: 0, defenseBuff: 2},
        {id: 9, name: 'Caverna', effect: 'Todos -1 DEF', attackBuff: 0, defenseBuff: -1},
        {id: 10, name: 'Arena Neutra', effect: 'Sem efeito', attackBuff: 0, defenseBuff: 0},
        {id: 11, name: 'Floresta Mágica', effect: 'Itens x2', itemMultiplier: 2},
        {id: 12, name: 'Deserto', effect: 'Agua -2 ATK', elementDebuff: {Agua: -2}}
    ];
}

// Função para embaralhar deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Função para comprar cartas iniciais
function drawInitialCards() {
    // Cada jogador compra 5 cartas
    for (let i = 0; i < 5; i++) {
        drawCard('player');
        drawCard('ai');
    }
    
    updateHandDisplay();
}

// Função para comprar uma carta com regra especial
function drawCard(player) {
    const deck = player === 'player' ? gameData.playerDeck : gameData.aiDeck;
    const hand = player === 'player' ? gameData.playerHand : gameData.aiHand;
    const discard = player === 'player' ? gameData.playerDiscard : gameData.aiDiscard;
    
    // Se deck vazio, embaralhar descarte
    if (deck.length === 0 && discard.length > 0) {
        deck.push(...discard);
        discard.length = 0;
        shuffleDeck(deck);
    }
    
    if (deck.length === 0) return; // Sem cartas para comprar
    
    // Regra especial: se for a 5ª carta e não há monstros na mão
    const monstersInHand = hand.filter(card => card.type === 'monster').length;
    const isNeedingMonster = hand.length === 4 && monstersInHand === 0;
    
    if (isNeedingMonster) {
        // Forçar monstro
        const monsterIndex = deck.findIndex(card => card.type === 'monster');
        if (monsterIndex !== -1) {
            const [monsterCard] = deck.splice(monsterIndex, 1);
            hand.push(monsterCard);
        } else {
            // Se não há monstro no deck, comprar carta normal
            hand.push(deck.pop());
        }
    } else {
        hand.push(deck.pop());
    }
}

// Função para iniciar novo turno
function startNewTurn() {
    gameData.currentPhase = 'card-selection';
    
    // Revelar carta de cenário
    revealScenarioCard();
    
    // Resetar seleções
    gameData.selectedPlayerMonster = null;
    gameData.selectedPlayerItem = null;
    gameData.selectedAIMonster = null;
    gameData.selectedAIItem = null;
    
    // Mostrar seção de seleção
    document.getElementById('selectionSection').classList.add('active');
    document.getElementById('combatSection').classList.remove('active');
    document.getElementById('continueSection').classList.remove('active');
    
    // IA faz sua escolha automaticamente
    makeAIChoice();
    
    // Atualizar displays
    updateHandDisplay();
    updateScenarioDisplay();
}

// Função para revelar carta de cenário
function revealScenarioCard() {
    const scenarioDeck = gameData.scenarioDeck;
    const scenarioDiscard = gameData.scenarioDiscard;
    
    // Se deck vazio, embaralhar descarte
    if (scenarioDeck.length === 0 && scenarioDiscard.length > 0) {
        scenarioDeck.push(...scenarioDiscard);
        scenarioDiscard.length = 0;
        shuffleDeck(scenarioDeck);
    }
    
// Função para atualizar display do cenário
function updateScenarioDisplay() {
    const currentScenarioEl = document.getElementById('currentScenario');
    if (gameData.currentScenario) {
        currentScenarioEl.innerHTML = `
            <div class="card-back scenario-active">
                <div>${gameData.currentScenario.name}</div>
                <div>${gameData.currentScenario.effect}</div>
            </div>
        `;
    }
}

// Função para atualizar mão do jogador
function updateHandDisplay() {
    const handElement = document.getElementById('playerHand');
    handElement.innerHTML = '';
    
    gameData.playerHand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `hand-card ${card.type}`;
        cardElement.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-element">${card.element || 'Item'}</div>
            ${card.type === 'monster' ? 
                `<div class="card-stats">ATK: ${card.attack}<br>HP: ${card.health}</div>` : 
                `<div class="card-effect">${card.effect}</div>`
            }
        `;
        cardElement.onclick = () => selectGameCard(index);
        handElement.appendChild(cardElement);
    });
}

// Função para selecionar carta no jogo
function selectGameCard(index) {
    if (gameData.currentPhase !== 'card-selection') return;
    
    const card = gameData.playerHand[index];
    
    if (card.type === 'monster' && !gameData.selectedPlayerMonster) {
        // Selecionar monstro
        gameData.selectedPlayerMonster = card;
        gameData.playerHand.splice(index, 1);
        
        // Atualizar display
        document.getElementById('selectedMonsterSlot').innerHTML = `
            <div class="selected-card-display">
                <div>${card.name}</div>
                <div>ATK: ${card.attack} HP: ${card.health}</div>
            </div>
        `;
        
        // Mostrar botão selecionar
        document.getElementById('selectButton').style.display = 'block';
        
    } else if (card.type === 'item' && gameData.selectedPlayerMonster && !gameData.selectedPlayerItem) {
        // Selecionar item (opcional)
        gameData.selectedPlayerItem = card;
        gameData.playerHand.splice(index, 1);
        
        document.getElementById('selectedItemSlot').innerHTML = `
            <div class="selected-card-display">
                <div>${card.name}</div>
                <div>${card.effect}</div>
            </div>
        `;
    }
    
    updateHandDisplay();
}

// Função para confirmar seleção no jogo
function confirmSelection() {
    if (!gameData.selectedPlayerMonster) {
        alert('Você deve selecionar um monstro!');
        return;
    }
    
    gameData.currentPhase = 'combat';
    
    // Esconder seleção e mostrar combate
    document.getElementById('selectionSection').classList.remove('active');
    document.getElementById('combatSection').classList.add('active');
    
    // Atualizar status
    document.getElementById('gameStatus').textContent = 'JOGAR-DUELO';
    
    // Executar combate
    setTimeout(() => {
        executeCombat();
    }, 1000);
}

// Função para IA fazer escolha
function makeAIChoice() {
    // IA escolhe monstro obrigatório
    const monsters = gameData.aiHand.filter(card => card.type === 'monster');
    if (monsters.length > 0) {
        const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
        gameData.selectedAIMonster = randomMonster;
        gameData.aiHand.splice(gameData.aiHand.indexOf(randomMonster), 1);
    }
    
    // IA pode escolher item (60% chance)
    const items = gameData.aiHand.filter(card => card.type === 'item');
    if (items.length > 0 && Math.random() > 0.4) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        gameData.selectedAIItem = randomItem;
        gameData.aiHand.splice(gameData.aiHand.indexOf(randomItem), 1);
    }
}

// Função para executar combate
function executeCombat() {
    const playerMonster = gameData.selectedPlayerMonster;
    const playerItem = gameData.selectedPlayerItem;
    const aiMonster = gameData.selectedAIMonster;
    const aiItem = gameData.selectedAIItem;
    const scenario = gameData.currentScenario;
    
    // Calcular ataques e defesas
    const playerAttack = calculateAttack(playerMonster, playerItem, scenario, aiMonster);
    const playerDefense = calculateDefense(playerMonster, playerItem, scenario);
    const aiAttack = calculateAttack(aiMonster, aiItem, scenario, playerMonster);
    const aiDefense = calculateDefense(aiMonster, aiItem, scenario);
    
    // Atualizar display de combate
    updateCombatDisplay(playerAttack, playerDefense, aiAttack, aiDefense);
    
    // Determinar sobreviventes
    const playerSurvives = aiAttack < playerDefense;
    const aiSurvives = playerAttack < aiDefense;
    
    // Atualizar pontuação
    if (playerSurvives && !aiSurvives) {
        gameData.playerScore++;
    } else if (!playerSurvives && aiSurvives) {
        gameData.aiScore++;
    }
    
    // Descartar cartas
    discardUsedCards();
    
    // Mostrar botão prosseguir
    document.getElementById('continueSection').classList.add('active');
}

// Função para calcular ataque
function calculateAttack(monster, item, scenario, opponent) {
    let attack = monster.attack;
    
    // Buff do item
    if (item && item.attackBuff) {
        attack += item.attackBuff;
    }
    
    // Buff do cenário
    if (scenario) {
        if (scenario.attackBuff) {
            attack += scenario.attackBuff;
        }
        if (scenario.elementBuff && scenario.elementBuff[monster.element]) {
            attack += scenario.elementBuff[monster.element];
        }
        if (scenario.elementDebuff && scenario.elementDebuff[monster.element]) {
            attack += scenario.elementDebuff[monster.element];
        }
    }
    
    // Vantagem de elemento
    const elementBonus = getElementAdvantage(monster.element, opponent.element);
    attack += elementBonus;
    
    return Math.max(0, attack);
}

// Função para calcular defesa
function calculateDefense(monster, item, scenario) {
    let defense = monster.health;
    
    // Buff do item
    if (item && item.defenseBuff) {
        defense += item.defenseBuff;
    }
    
    // Buff do cenário
    if (scenario && scenario.defenseBuff) {
        defense += scenario.defenseBuff;
    }
    
    // TODO: Adicionar buff de amuleto aqui
    
    return Math.max(1, defense);
}

// Função para calcular vantagem de elemento
function getElementAdvantage(attackerElement, defenderElement) {
    const advantages = {
        'Fogo': 'Terra',
        'Terra': 'Raio',
        'Raio': 'Agua',
        'Agua': 'Fogo'
    };
    
    return advantages[attackerElement] === defenderElement ? 2 : 0;
}

// Função para atualizar display de combate
function updateCombatDisplay(playerAttack, playerDefense, aiAttack, aiDefense) {
    // Atualizar stats do jogador
    document.getElementById('playerAttackCalc').textContent = `${gameData.selectedPlayerMonster.attack} + ${gameData.selectedPlayerItem ? gameData.selectedPlayerItem.attackBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.attackBuff || 0 : 0} + ${getElementAdvantage(gameData.selectedPlayerMonster.element, gameData.selectedAIMonster.element)}`;
    document.getElementById('playerFinalAttack').textContent = playerAttack;
    
    document.getElementById('playerDefenseCalc').textContent = `${gameData.selectedPlayerMonster.health} + ${gameData.selectedPlayerItem ? gameData.selectedPlayerItem.defenseBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.defenseBuff || 0 : 0} + 0`;
    document.getElementById('playerFinalDefense').textContent = playerDefense;
    
    // Atualizar stats da IA
    document.getElementById('aiAttackCalc').textContent = `${gameData.selectedAIMonster.attack} + ${gameData.selectedAIItem ? gameData.selectedAIItem.attackBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.attackBuff || 0 : 0} + ${getElementAdvantage(gameData.selectedAIMonster.element, gameData.selectedPlayerMonster.element)}`;
    document.getElementById('aiFinalAttack').textContent = aiAttack;
    
    document.getElementById('aiDefenseCalc').textContent = `${gameData.selectedAIMonster.health} + ${gameData.selectedAIItem ? gameData.selectedAIItem.defenseBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.defenseBuff || 0 : 0} + 0`;
    document.getElementById('aiFinalDefense').textContent = aiDefense;
}

// Função para descartar cartas usadas
function discardUsedCards() {
    if (gameData.selectedPlayerMonster) {
        gameData.playerDiscard.push(gameData.selectedPlayerMonster);
    }
    if (gameData.selectedPlayerItem) {
        gameData.playerDiscard.push(gameData.selectedPlayerItem);
    }
    if (gameData.selectedAIMonster) {
        gameData.aiDiscard.push(gameData.selectedAIMonster);
    }
    if (gameData.selectedAIItem) {
        gameData.aiDiscard.push(gameData.selectedAIItem);
    }
    if (gameData.currentScenario) {
        gameData.scenarioDiscard.push(gameData.currentScenario);
    }
}

// Função para continuar jogo
function continueGame() {
    // Verificar se jogo acabou
    if (gameData.playerScore >= 3 || gameData.aiScore >= 3) {
        endGame();
        return;
    }
    
    // Comprar cartas até ter 5 na mão
    while (gameData.playerHand.length < 5 && (gameData.playerDeck.length > 0 || gameData.playerDiscard.length > 0)) {
        drawCard('player');
    }
    while (gameData.aiHand.length < 5 && (gameData.aiDeck.length > 0 || gameData.aiDiscard.length > 0)) {
        drawCard('ai');
    }
    
    // Próximo turno
    startNewTurn();
}

// Função para finalizar jogo
function endGame() {
    const isVictory = gameData.playerScore > gameData.aiScore;
    const coinsEarned = isVictory ? 50 : 20;
    
    gameData.playerCoins += coinsEarned;
    gameData.gamesPlayed++;
    if (isVictory) gameData.victories++;
    
    // Atualizar status
    document.getElementById('gameStatus').textContent = 'POS-JOGAR';
    
    // Mostrar resultado
    document.getElementById('gameResult').classList.add('active');
    document.getElementById('resultTitle').textContent = isVictory ? 'VITORIA' : 'DERROTA';
    document.getElementById('coinsEarned').textContent = coinsEarned;
    
    console.log('Jogo finalizado:', {
        isVictory,
        coinsEarned,
        playerScore: gameData.playerScore,
        aiScore: gameData.aiScore
    });
}

// Função para finalizar partida
function finishGame() {
    showDoorTransition(() => {
        // Voltar ao menu
        document.getElementById('gameResult').classList.remove('active');
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('mainMenu').style.display = 'block';
        document.getElementById('mainMenu').classList.add('active');
        gameState = 'menu';
        
        // Reset game table
        document.getElementById('gameTable').classList.remove('active');
    });
}

// Inicialização do jogo
window.addEventListener('load', () => {
    setTimeout(() => {
        gameState = 'menu';
        
        showDoorTransition(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            const mainMenu = document.getElementById('mainMenu');
            mainMenu.classList.add('active', 'fade-in');
        });
    }, 3000);
});

// Prevenir cliques durante transições
document.addEventListener('click', (e) => {
    if (isTransitioning) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);// Controle do estado do jogo
let gameState = 'loading';
let isTransitioning = false;

// Estado do jogo
const gameData = {
    playerScore: 0,
    aiScore: 0,
    playerHand: [],
    aiHand: [],
    playerDeck: [],
    aiDeck: [],
    scenarioDeck: [],
    scenarioDiscard: [],
    playerDiscard: [],
    aiDiscard: [],
    currentScenario: null,
    selectedPlayerMonster: null,
    selectedPlayerItem: null,
    selectedAIMonster: null,
    selectedAIItem: null,
    playerCoins: 100,
    playerLevel: 1,
    gamesPlayed: 0,
    victories: 0,
    currentPhase: 'deck-selection' // deck-selection, card-selection, combat, result
};

// Função para mostrar transição de porta
function showDoorTransition(callback) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const doorTransition = document.getElementById('doorTransition');
    
    doorTransition.classList.add('active');
    
    setTimeout(() => {
        if (callback) callback();
        
        setTimeout(() => {
            doorTransition.classList.remove('active');
            
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }, 1000);
    }, 800);
}

// Função para lidar com cliques no menu
function handleMenuClick(option) {
    console.log(`Clicou em: ${option}`);
    
    showDoorTransition(() => {
        switch(option) {
            case 'jogar':
                showGameScreen();
                break;
            case 'inventario':
                console.log('Abrindo inventário...');
                break;
            case 'amuleto':
                console.log('Abrindo amuletos...');
                break;
            case 'loja':
                console.log('Abrindo loja...');
                break;
            case 'perfil':
                console.log('Abrindo perfil...');
                break;
            case 'tutorial':
                console.log('Abrindo tutorial...');
                break;
        }
    });
}

// Função para mostrar tela do jogo
function showGameScreen() {
    gameState = 'game';
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('gameScreen').classList.add('active');
    document.getElementById('deckSelection').classList.add('active');
    
    // Atualizar status
    document.getElementById('gameStatus').textContent = 'PRE-JOGAR';
}

// Função para confirmar seleção de deck
function confirmDeckSelection() {
    // Esconder seleção de deck
    document.getElementById('deckSelection').classList.remove('active');
    
    // Tirar blur da mesa
    document.getElementById('gameTable').classList.add('active');
    
    // Atualizar status para JOGAR
    document.getElementById('gameStatus').textContent = 'JOGAR';
    
    // Inicializar jogo
    initializeGame();
}

// Função para inicializar o jogo
function initializeGame() {
    // Resetar dados do jogo
    gameData.playerScore = 0;
    gameData.aiScore = 0;
    gameData.playerHand = [];
    gameData.aiHand = [];
    gameData.playerDiscard = [];
    gameData.aiDiscard = [];
    gameData.scenarioDiscard = [];
    gameData.selectedPlayerMonster = null;
    gameData.selectedPlayerItem = null;
    gameData.selectedAIMonster = null;
    gameData.selectedAIItem = null;
    
    // Gerar decks
    generateDecks();
    
    // Embaralhar decks
    shuffleDeck(gameData.playerDeck);
    shuffleDeck(gameData.aiDeck);
    shuffleDeck(gameData.scenarioDeck);
    
    // Comprar cartas iniciais (5 cartas cada)
    drawInitialCards();
    
    // Começar primeiro turno
    startNewTurn();
}

// Função para gerar decks
function generateDecks() {
    // Deck do jogador (20 cartas: 12 monstros, 8 itens)
    gameData.playerDeck = generatePlayerDeck();
    
    // Deck da IA (mesmo padrão)
    gameData.aiDeck = generateAIDeck();
    
    // Deck de cenários (12 cartas)
    gameData.scenarioDeck = generateScenarioDeck();
}

// Função para gerar deck do jogador
function generatePlayerDeck() {
    const monsters = [
        {id: 1, name: 'Dragão Vermelho', type: 'monster', element: 'Fogo', attack: 6, health: 4},
        {id: 2, name: 'Golem de Pedra', type: 'monster', element: 'Terra', attack: 4, health: 6},
        {id: 3, name: 'Espírito do Raio', type: 'monster', element: 'Raio', attack: 5, health: 3},
        {id: 4, name: 'Leviatã Azul', type: 'monster', element: 'Agua', attack: 4, health: 5},
        {id: 5, name: 'Fênix Dourada', type: 'monster', element: 'Fogo', attack: 7, health: 3},
        {id: 6, name: 'Urso da Terra', type: 'monster', element: 'Terra', attack: 5, health: 5}
    ];
    
    const items = [
        {id: 7, name: 'Espada Flamejante', type: 'item', effect: '+2 ATK', attackBuff: 2, defenseBuff: 0},
        {id: 8, name: 'Escudo Mágico', type: 'item', effect: '+2 DEF', attackBuff: 0, defenseBuff: 2},
        {id: 9, name: 'Poção de Força', type: 'item', effect: '+1 ATK +1 DEF', attackBuff: 1, defenseBuff: 1},
        {id: 10, name: 'Armadura Pesada', type: 'item', effect: '+3 DEF', attackBuff: 0, defenseBuff: 3}
    ];
    
    const deck = [];
    
    // Adicionar 12 monstros
    for (let i = 0; i < 12; i++) {
        deck.push({...monsters[i % monsters.length], uniqueId: `m_${i}`});
    }
    
    // Adicionar 8 itens
    for (let i = 0; i < 8; i++) {
        deck.push({...items[i % items.length], uniqueId: `i_${i}`});
    }
    
    return deck;
}

// Função para gerar deck da IA
function generateAIDeck() {
    // Usar o mesmo padrão do jogador por enquanto
    return generatePlayerDeck();
}

// Função para gerar deck de cenários
function generateScenarioDeck() {
    return [
        {id: 1, name: 'Campo de Batalha', effect: 'Todos +1 ATK', attackBuff: 1, defenseBuff: 0},
        {id: 2, name: 'Fortaleza', effect: 'Todos +1 DEF', attackBuff: 0, defenseBuff: 1},
        {id: 3, name: 'Tempestade', effect: 'Raio +2 ATK', elementBuff: {Raio: 2}},
        {id: 4, name: 'Vulcão', effect: 'Fogo +2 ATK', elementBuff: {Fogo: 2}},
        {id: 5, name: 'Oceano', effect: 'Agua +2 ATK', elementBuff: {Agua: 2}},
        {id: 6, name: 'Montanha', effect: 'Terra +2 ATK', elementBuff: {Terra: 2}},
        {id: 7, name: 'Cemitério', effect: 'Todos -1 ATK', attackBuff: -1, defenseBuff: 0},
        {id: 8, name: 'Templo', effect: 'Todos +2 DEF', attackBuff: 0, defenseBuff: 2},
        {id: 9, name: 'Caverna', effect: 'Todos -1 DEF', attackBuff: 0, defenseBuff: -1},
        {id: 10, name: 'Arena Neutra', effect: 'Sem efeito', attackBuff: 0, defenseBuff: 0},
        {id: 11, name: 'Floresta Mágica', effect: 'Itens x2', itemMultiplier: 2},
        {id: 12, name: 'Deserto', effect: 'Agua -2 ATK', elementDebuff: {Agua: -2}}
    ];
}

// Função para embaralhar deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Função para comprar cartas iniciais
function drawInitialCards() {
    // Cada jogador compra 5 cartas
    for (let i = 0; i < 5; i++) {
        drawCard('player');
        drawCard('ai');
    }
    
    updateHandDisplay();
}

// Função para comprar uma carta com regra especial
function drawCard(player) {
    const deck = player === 'player' ? gameData.playerDeck : gameData.aiDeck;
    const hand = player === 'player' ? gameData.playerHand : gameData.aiHand;
    const discard = player === 'player' ? gameData.playerDiscard : gameData.aiDiscard;
    
    // Se deck vazio, embaralhar descarte
    if (deck.length === 0 && discard.length > 0) {
        deck.push(...discard);
        discard.length = 0;
        shuffleDeck(deck);
    }
    
    if (deck.length === 0) return; // Sem cartas para comprar
    
    // Regra especial: se for a 5ª carta e não há monstros na mão
    const monstersInHand = hand.filter(card => card.type === 'monster').length;
    const isNeedingMonster = hand.length === 4 && monstersInHand === 0;
    
    if (isNeedingMonster) {
        // Forçar monstro
        const monsterIndex = deck.findIndex(card => card.type === 'monster');
        if (monsterIndex !== -1) {
            const [monsterCard] = deck.splice(monsterIndex, 1);
            hand.push(monsterCard);
        } else {
            // Se não há monstro no deck, comprar carta normal
            hand.push(deck.pop());
        }
    } else {
        hand.push(deck.pop());
    }
}

// Função para iniciar novo turno
function startNewTurn() {
    gameData.currentPhase = 'card-selection';
    
    // Revelar carta de cenário
    revealScenarioCard();
    
    // Resetar seleções
    gameData.selectedPlayerMonster = null;
    gameData.selectedPlayerItem = null;
    gameData.selectedAIMonster = null;
    gameData.selectedAIItem = null;
    
    // Mostrar seção de seleção
    document.getElementById('selectionSection').classList.add('active');
    document.getElementById('combatSection').classList.remove('active');
    document.getElementById('continueSection').classList.remove('active');
    
    // IA faz sua escolha automaticamente
    makeAIChoice();
    
    // Atualizar displays
    updateHandDisplay();
    updateScenarioDisplay();
}

// Função para revelar carta de cenário
function revealScenarioCard() {
    const scenarioDeck = gameData.scenarioDeck;
    const scenarioDiscard = gameData.scenarioDiscard;
    
    // Se deck vazio, embaralhar descarte
    if (scenarioDeck.length === 0 && scenarioDiscard.length > 0) {
        scenarioDeck.push(...scenarioDiscard);
        scenarioDiscard.length = 0;
        shuffleDeck(scenarioDeck);
    }
    
    if (scenarioDeck.length > 0) {
        gameData.currentScenario = scenarioDeck.pop();
    }
}

// Função para atualizar display do cenário
function updateScenarioDisplay() {
    const currentScenarioEl = document.getElementById('currentScenario');
    if (gameData.currentScenario) {
        currentScenarioEl.innerHTML = `
            <div class="card-back scenario-active">
                <div>${gameData.currentScenario.name}</div>
                <div>${gameData.currentScenario.effect}</div>
            </div>
        `;
    }
}

// Função para atualizar mão do jogador
function updateHandDisplay() {
    const handElement = document.getElementById('playerHand');
    handElement.innerHTML = '';
    
    gameData.playerHand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `hand-card ${card.type}`;
        cardElement.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-element">${card.element || 'Item'}</div>
            ${card.type === 'monster' ? 
                `<div class="card-stats">ATK: ${card.attack}<br>HP: ${card.health}</div>` : 
                `<div class="card-effect">${card.effect}</div>`
            }
        `;
        cardElement.onclick = () => selectCard(index);
        handElement.appendChild(cardElement);
    });
}

// Função para selecionar carta
function selectCard(index) {
    if (gameData.currentPhase !== 'card-selection') return;
    
    const card = gameData.playerHand[index];
    
    if (card.type === 'monster' && !gameData.selectedPlayerMonster) {
        // Selecionar monstro
        gameData.selectedPlayerMonster = card;
        gameData.playerHand.splice(index, 1);
        
        // Atualizar display
        document.getElementById('selectedMonsterSlot').innerHTML = `
            <div class="selected-card-display">
                <div>${card.name}</div>
                <div>ATK: ${card.attack} HP: ${card.health}</div>
            </div>
        `;
        
        // Mostrar botão selecionar
        document.getElementById('selectButton').style.display = 'block';
        
    } else if (card.type === 'item' && gameData.selectedPlayerMonster && !gameData.selectedPlayerItem) {
        // Selecionar item (opcional)
        gameData.selectedPlayerItem = card;
        gameData.playerHand.splice(index, 1);
        
        document.getElementById('selectedItemSlot').innerHTML = `
            <div class="selected-card-display">
                <div>${card.name}</div>
                <div>${card.effect}</div>
            </div>
        `;
    }
    
    updateHandDisplay();
}

// Função para confirmar seleção
function confirmSelection() {
    if (!gameData.selectedPlayerMonster) {
        alert('Você deve selecionar um monstro!');
        return;
    }
    
    gameData.currentPhase = 'combat';
    
    // Esconder seleção e mostrar combate
    document.getElementById('selectionSection').classList.remove('active');
    document.getElementById('combatSection').classList.add('active');
    
    // Atualizar status
    document.getElementById('gameStatus').textContent = 'JOGAR-DUELO';
    
    // Executar combate
    setTimeout(() => {
        executeCombat();
    }, 1000);
}

// Função para IA fazer escolha
function makeAIChoice() {
    // IA escolhe monstro obrigatório
    const monsters = gameData.aiHand.filter(card => card.type === 'monster');
    if (monsters.length > 0) {
        const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
        gameData.selectedAIMonster = randomMonster;
        gameData.aiHand.splice(gameData.aiHand.indexOf(randomMonster), 1);
    }
    
    // IA pode escolher item (60% chance)
    const items = gameData.aiHand.filter(card => card.type === 'item');
    if (items.length > 0 && Math.random() > 0.4) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        gameData.selectedAIItem = randomItem;
        gameData.aiHand.splice(gameData.aiHand.indexOf(randomItem), 1);
    }
}

// Função para executar combate
function executeCombat() {
    const playerMonster = gameData.selectedPlayerMonster;
    const playerItem = gameData.selectedPlayerItem;
    const aiMonster = gameData.selectedAIMonster;
    const aiItem = gameData.selectedAIItem;
    const scenario = gameData.currentScenario;
    
    // Calcular ataques e defesas
    const playerAttack = calculateAttack(playerMonster, playerItem, scenario, aiMonster);
    const playerDefense = calculateDefense(playerMonster, playerItem, scenario);
    const aiAttack = calculateAttack(aiMonster, aiItem, scenario, playerMonster);
    const aiDefense = calculateDefense(aiMonster, aiItem, scenario);
    
    // Atualizar display de combate
    updateCombatDisplay(playerAttack, playerDefense, aiAttack, aiDefense);
    
    // Determinar sobreviventes
    const playerSurvives = aiAttack < playerDefense;
    const aiSurvives = playerAttack < aiDefense;
    
    // Atualizar pontuação
    if (playerSurvives && !aiSurvives) {
        gameData.playerScore++;
    } else if (!playerSurvives && aiSurvives) {
        gameData.aiScore++;
    }
    
    // Descartar cartas
    discardUsedCards();
    
    // Mostrar botão prosseguir
    document.getElementById('continueSection').classList.add('active');
}

// Função para calcular ataque
function calculateAttack(monster, item, scenario, opponent) {
    let attack = monster.attack;
    
    // Buff do item
    if (item && item.attackBuff) {
        attack += item.attackBuff;
    }
    
    // Buff do cenário
    if (scenario) {
        if (scenario.attackBuff) {
            attack += scenario.attackBuff;
        }
        if (scenario.elementBuff && scenario.elementBuff[monster.element]) {
            attack += scenario.elementBuff[monster.element];
        }
        if (scenario.elementDebuff && scenario.elementDebuff[monster.element]) {
            attack += scenario.elementDebuff[monster.element];
        }
    }
    
    // Vantagem de elemento
    const elementBonus = getElementAdvantage(monster.element, opponent.element);
    attack += elementBonus;
    
    return Math.max(0, attack);
}

// Função para calcular defesa
function calculateDefense(monster, item, scenario) {
    let defense = monster.health;
    
    // Buff do item
    if (item && item.defenseBuff) {
        defense += item.defenseBuff;
    }
    
    // Buff do cenário
    if (scenario && scenario.defenseBuff) {
        defense += scenario.defenseBuff;
    }
    
    // TODO: Adicionar buff de amuleto aqui
    
    return Math.max(1, defense);
}

// Função para calcular vantagem de elemento
function getElementAdvantage(attackerElement, defenderElement) {
    const advantages = {
        'Fogo': 'Terra',
        'Terra': 'Raio',
        'Raio': 'Agua',
        'Agua': 'Fogo'
    };
    
    return advantages[attackerElement] === defenderElement ? 2 : 0;
}

// Função para atualizar display de combate
function updateCombatDisplay(playerAttack, playerDefense, aiAttack, aiDefense) {
    // Atualizar stats do jogador
    document.getElementById('playerAttackCalc').textContent = `${gameData.selectedPlayerMonster.attack} + ${gameData.selectedPlayerItem ? gameData.selectedPlayerItem.attackBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.attackBuff || 0 : 0} + ${getElementAdvantage(gameData.selectedPlayerMonster.element, gameData.selectedAIMonster.element)}`;
    document.getElementById('playerFinalAttack').textContent = playerAttack;
    
    document.getElementById('playerDefenseCalc').textContent = `${gameData.selectedPlayerMonster.health} + ${gameData.selectedPlayerItem ? gameData.selectedPlayerItem.defenseBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.defenseBuff || 0 : 0} + 0`;
    document.getElementById('playerFinalDefense').textContent = playerDefense;
    
    // Atualizar stats da IA
    document.getElementById('aiAttackCalc').textContent = `${gameData.selectedAIMonster.attack} + ${gameData.selectedAIItem ? gameData.selectedAIItem.attackBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.attackBuff || 0 : 0} + ${getElementAdvantage(gameData.selectedAIMonster.element, gameData.selectedPlayerMonster.element)}`;
    document.getElementById('aiFinalAttack').textContent = aiAttack;
    
    document.getElementById('aiDefenseCalc').textContent = `${gameData.selectedAIMonster.health} + ${gameData.selectedAIItem ? gameData.selectedAIItem.defenseBuff || 0 : 0} + ${gameData.currentScenario ? gameData.currentScenario.defenseBuff || 0 : 0} + 0`;
    document.getElementById('aiFinalDefense').textContent = aiDefense;
}

// Função para descartar cartas usadas
function discardUsedCards() {
    if (gameData.selectedPlayerMonster) {
        gameData.playerDiscard.push(gameData.selectedPlayerMonster);
    }
    if (gameData.selectedPlayerItem) {
        gameData.playerDiscard.push(gameData.selectedPlayerItem);
    }
    if (gameData.selectedAIMonster) {
        gameData.aiDiscard.push(gameData.selectedAIMonster);
    }
    if (gameData.selectedAIItem) {
        gameData.aiDiscard.push(gameData.selectedAIItem);
    }
    if (gameData.currentScenario) {
        gameData.scenarioDiscard.push(gameData.currentScenario);
    }
}

// Função para continuar jogo
function continueGame() {
    // Verificar se jogo acabou
    if (gameData.playerScore >= 3 || gameData.aiScore >= 3) {
        endGame();
        return;
    }
    
    // Comprar cartas até ter 5 na mão
    while (gameData.playerHand.length < 5 && (gameData.playerDeck.length > 0 || gameData.playerDiscard.length > 0)) {
        drawCard('player');
    }
    while (gameData.aiHand.length < 5 && (gameData.aiDeck.length > 0 || gameData.aiDiscard.length > 0)) {
        drawCard('ai');
    }
    
    // Próximo turno
    startNewTurn();
}

// Função para finalizar jogo
function endGame() {
    const isVictory = gameData.playerScore > gameData.aiScore;
    const coinsEarned = isVictory ? 50 : 20;
    
    gameData.playerCoins += coinsEarned;
    gameData.gamesPlayed++;
    if (isVictory) gameData.victories++;
    
    // Atualizar status
    document.getElementById('gameStatus').textContent = 'POS-JOGAR';
    
    // Mostrar resultado
    document.getElementById('gameResult').classList.add('active');
    document.getElementById('resultTitle').textContent = isVictory ? 'VITORIA' : 'DERROTA';
    document.getElementById('coinsEarned').textContent = coinsEarned;
    
    console.log('Jogo finalizado:', {
        isVictory,
        coinsEarned,
        playerScore: gameData.playerScore,
        aiScore: gameData.aiScore
    });
}

// Função para finalizar partida
function finishGame() {
    showDoorTransition(() => {
        // Voltar ao menu
        document.getElementById('gameResult').classList.remove('active');
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('mainMenu').style.display = 'block';
        document.getElementById('mainMenu').classList.add('active');
        gameState = 'menu';
        
        // Reset game table
        document.getElementById('gameTable').classList.remove('active');
    });
}

// Inicialização do jogo
window.addEventListener('load', () => {
    setTimeout(() => {
        gameState = 'menu';
        
        showDoorTransition(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            const mainMenu = document.getElementById('mainMenu');
            mainMenu.classList.add('active', 'fade-in');
        });
    }, 3000);
});

// Prevenir cliques durante transições
document.addEventListener('click', (e) => {
    if (isTransitioning) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);}