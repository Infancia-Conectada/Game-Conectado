
// Estado do jogo
let currentDeck = 1;
let selectedCard = null;
let selectedType = null; // 'deck' ou 'inventory'

// Decks (3 decks de 20 cartas cada)
const decks = {
    1: Array(20).fill(null),
    2: Array(20).fill(null),
    3: Array(20).fill(null)
};

// Inventário (100 cartas no total, 24 visíveis por vez)
const inventory = Array(100).fill(null).map((_, i) => ({
    id: i + 1,
    image: `https://via.placeholder.com/50x70/14b8a6/FFFFFF?text=C${i + 1}`
}));

let inventoryScrollPosition = 0;

// Inicializar as cartas do deck
function initializeDeckCards() {
    const rows = deckCards.querySelectorAll('.deck-row');
    rows.forEach((row, rowIndex) => {
        row.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const cardIndex = rowIndex * 10 + i;
            const card = document.createElement('div');
            card.classList.add('card-slot', 'empty');
            card.dataset.index = cardIndex;
            card.dataset.type = 'deck';
            
            card.addEventListener('click', () => selectCard(card, 'deck', cardIndex));
            row.appendChild(card);
        }
    });
    renderDeck();
}

// Renderizar deck atual
function renderDeck() {
    const slots = deckCards.querySelectorAll('.card-slot');
    slots.forEach((slot, index) => {
        const card = decks[currentDeck][index];
        if (card) {
            slot.style.backgroundImage = `url(${card.image})`;
            slot.classList.remove('empty');
        } else {
            slot.style.backgroundImage = '';
            slot.classList.add('empty');
        }
        slot.classList.remove('selected');
    });
}

// Inicializar inventário
function initializeInventory() {
    inventoryGrid.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        const slot = document.createElement('div');
        slot.classList.add('inventory-slot');
        slot.dataset.index = i;
        slot.dataset.type = 'inventory';
        
        slot.addEventListener('click', () => {
            const actualIndex = inventoryScrollPosition + i;
            if (inventory[actualIndex]) {
                selectCard(slot, 'inventory', actualIndex);
            }
        });
        
        inventoryGrid.appendChild(slot);
    }
    renderInventory();
}

// Renderizar inventário
function renderInventory() {
    const slots = inventoryGrid.querySelectorAll('.inventory-slot');
    slots.forEach((slot, i) => {
        const actualIndex = inventoryScrollPosition + i;
        const card = inventory[actualIndex];
        
        if (card) {
            slot.style.backgroundImage = `url(${card.image})`;
            slot.classList.remove('empty');
        } else {
            slot.style.backgroundImage = '';
            slot.classList.add('empty');
        }
        slot.classList.remove('selected');
    });
}

// Selecionar carta
function selectCard(element, type, index) {
    // Remover seleção anterior
    document.querySelectorAll('.card-slot.selected, .inventory-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Adicionar nova seleção
    element.classList.add('selected');
    selectedCard = index;
    selectedType = type;
    
    // Atualizar preview
    if (type === 'deck') {
        const card = decks[currentDeck][index];
        if (card) {
            cardPreview.src = card.image;
        }
    } else {
        const card = inventory[index];
        if (card) {
            cardPreview.src = card.image;
        }
    }
    
    updateButtons();
}

// Atualizar botões
function updateButtons() {
    if (selectedCard === null) {
        btnAddRemove.disabled = true;
        btnAddRemove.textContent = 'ADICIONAR';
        btnRecycle.disabled = true;
    } else if (selectedType === 'deck') {
        btnAddRemove.disabled = false;
        btnAddRemove.textContent = 'REMOVER';
        btnRecycle.disabled = true;
    } else if (selectedType === 'inventory') {
        const deckHasSpace = decks[currentDeck].some(card => card === null);
        btnAddRemove.disabled = !deckHasSpace;
        btnAddRemove.textContent = 'ADICIONAR';
        btnRecycle.disabled = false;
    }
}

// Adicionar/Remover carta
btnAddRemove.addEventListener('click', () => {
    if (selectedType === 'deck') {
        // Remover do deck
        const card = decks[currentDeck][selectedCard];
        decks[currentDeck][selectedCard] = null;
        inventory.push(card);
        renderDeck();
        renderInventory();
    } else if (selectedType === 'inventory') {
        // Adicionar ao deck
        const emptySlot = decks[currentDeck].findIndex(card => card === null);
        if (emptySlot !== -1) {
            decks[currentDeck][emptySlot] = inventory[selectedCard];
            inventory.splice(selectedCard, 1);
            renderDeck();
            renderInventory();
        }
    }
    
    selectedCard = null;
    selectedType = null;
    cardPreview.src = 'https://via.placeholder.com/300x400/2dd4bf/FFFFFF?text=P2';
    updateButtons();
});

// Reciclar carta
btnRecycle.addEventListener('click', () => {
    if (selectedType === 'inventory' && selectedCard !== null) {
        const coins = Math.floor(Math.random() * 50) + 25;
        coinsAmount.textContent = coins;
        recycleModal.classList.add('active');
    }
});

btnConfirmRecycle.addEventListener('click', () => {
    inventory.splice(selectedCard, 1);
    renderInventory();
    recycleModal.classList.remove('active');
    selectedCard = null;
    selectedType = null;
    cardPreview.src = 'https://via.placeholder.com/300x400/2dd4bf/FFFFFF?text=P2';
    updateButtons();
});

btnCancelRecycle.addEventListener('click', () => {
    recycleModal.classList.remove('active');
});

// Scroll do inventário
document.querySelector('.scroll-up').addEventListener('click', () => {
    if (inventoryScrollPosition > 0) {
        inventoryScrollPosition = Math.max(0, inventoryScrollPosition - 6);
        renderInventory();
    }
});

document.querySelector('.scroll-down').addEventListener('click', () => {
    const maxScroll = Math.max(0, inventory.length - 24);
    if (inventoryScrollPosition < maxScroll) {
        inventoryScrollPosition = Math.min(maxScroll, inventoryScrollPosition + 6);
        renderInventory();
    }
});

// Voltar ao menu
btnBack.addEventListener('click', () => {
    changeScreen(inventoryScreen, menuScreen);
});

// Event listeners para as opções do menu
menuOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
        const optionName = option.getAttribute('data-option');
        tooltipText.textContent = tooltipTexts[optionName];
        tooltip.classList.add('visible');
    });
    
    option.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
    
    option.addEventListener('click', () => {
        const optionName = option.getAttribute('data-option');
        console.log(`Navegando para: ${optionName}`);
        // Aqui você pode adicionar a lógica para navegar para outras telas
        // changeScreen(menuScreen, outraTela);
    });
});