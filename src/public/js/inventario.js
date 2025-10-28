
const InventarioModel = require('../models/inventarioModel');

// Estado do jogo
let currentDeck = 1;
let selectedCard = null;
let selectedType = null; // 'deck' ou 'inventory'
let inventoryData = [];
let deckData = [];
// manter essa linha de comando 
// let userId = null;
let userId = 1
let inventoryScrollPosition = 0;
const CARDS_PER_PAGE = 24;

// Inicializar interface do inventário
async function initializeInventoryInterface(userId) {
    try {
        // Definir usuário atual
        this.userId = userId;

        // Buscar dados do banco
        await refreshData();

        // Inicializar interface
        initializeDeckCards();
        initializeInventoryGrid();
        
        // Renderizar dados
        renderDeck();
        renderInventory();
        updateButtons();

    } catch (error) {
        console.error('Erro ao inicializar inventário:', error);
    }
}

// Inicializar as cartas do deck
function initializeDeckCards() {
    const rows = deckCards.querySelectorAll('.deck-row');
    rows.forEach((row, rowIndex) => {
        row.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const cardIndex = rowIndex * 10 + i;
            const card = document.createElement('div');
            card.classList.add('inventory-icon');
            card.dataset.index = cardIndex;
            card.dataset.type = 'deck';
            card.style.backgroundImage = 'url("../img/icones/NENHUM.png")';
            card.addEventListener('click', () => selectCard(card, 'deck', cardIndex));
            row.appendChild(card);
        }
    });
}

// Renderizar deck atual
function renderDeck() {
    const slots = deckCards.querySelectorAll('.deck-icon');
    slots.forEach((slot, index) => {
        const card = deckData[index];
        if (card) {
            slot.style.backgroundImage = `url(${card.ico_url})`;
            slot.classList.remove('empty');
        } else {
            slot.style.backgroundImage = 'url("../img/icones/NENHUM.png")';
            slot.classList.add('empty');
        }
        slot.classList.remove('selected');
    });
}

// Inicializar grid do inventário
function initializeInventoryGrid() {
    const rows = deckCards.querySelectorAll('.inventory-row');
    rows.forEach((row, rowIndex) => {
        row.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const cardIndex = rowIndex * 10 + i;
            const card = document.createElement('div');
            card.classList.add('inventory-icon');
            card.dataset.index = cardIndex;
            card.dataset.type = 'deck';
            card.style.backgroundImage = 'url("../img/icones/NENHUM.png")';
            card.addEventListener('click', () => {
                const actualIndex = inventoryScrollPosition + index;
                if (inventoryData[actualIndex]) {
                    selectCard(icon, 'inventory', actualIndex);
                }
            });
        };
    });
};

// Renderizar inventário
function renderInventory() {
    console.log('Renderizando inventário com dados:', inventoryData);
    
    const icons = inventoryGrid.querySelectorAll('.inventory-icon');
    console.log('Encontrados ' + icons.length + ' ícones para renderizar');

    icons.forEach((icon, index) => {
        const actualIndex = inventoryScrollPosition + index;
        const card = inventoryData[actualIndex];
        
        icon.classList.remove('selected');
        
        if (card) {
            console.log(`Renderizando carta ${actualIndex}:`, card);
            icon.style.backgroundImage = `url(${card.ico_url})`;
            icon.classList.remove('empty');
            icon.title = card.nome;
            icon.dataset.cardId = card.id;
        } else {
            icon.style.backgroundImage = 'url("../img/icones/NENHUM.png")';
            icon.classList.add('empty');
            icon.title = '';
            icon.dataset.cardId = '';
        }
    });

    console.log('Inventário atualizado:', {
        total: inventoryData.length,
        visible: Math.min(CARDS_PER_PAGE, inventoryData.length - inventoryScrollPosition),
        icones: icons.length
    });
}

// Selecionar carta
function selectCard(element, type, index) {
    // Remover seleção anterior
    document.querySelectorAll('.deck-icon.selected, .inventory-icon.selected').forEach(el => {
        el.classList.remove('selected');
    });
    // Adicionar nova seleção
    element.classList.add('selected');
    selectedCard = index;
    selectedType = type;
    
    // Atualizar preview
    if (type === 'deck') {
        const card = deckData[index];
        if (card) {
            cardPreview.src = card.img_url;
        }
    } else {
        const card = inventoryData[index];
        if (card) {
            cardPreview.src = card.img_url;
        }
    }
    
    updateButtons();
}

// Atualizar botões
function updateButtons() {
    const hasSelection = selectedCard !== null;
    const isDeckSelection = selectedType === 'deck';
    const deckHasSpace = deckData.length < 20;
    
    btnAddRemove.disabled = !hasSelection;
    btnAddRemove.querySelector('img').src = isDeckSelection ? 
        '../img/inputs/botao-remover.png' : 
        '../img/inputs/botao-adicionar.png';
    
    btnRecycle.disabled = !hasSelection || isDeckSelection;
}

// Adicionar/Remover carta
btnAddRemove.addEventListener('click', async () => {
    if (!selectedCard) return;

    try {
        if (selectedType === 'deck') {
            // Remover carta do deck
            const card = deckData[selectedCard];
            await InventarioModel.removeCartaFromDeck(currentDeck, card.id);

            // Atualizar quantidade no inventário
            const inventarioCard = inventoryData.find(c => c.id === card.id);
            if (inventarioCard) {
                await InventarioModel.updateInventarioQuantidade(inventarioCard.id, inventarioCard.quantidade + 1);
            } else {
                // Adicionar nova entrada no inventário
                await db.query('INSERT INTO inventario (id_user, id_carta, quantidade) VALUES (?, ?, 1)', [userId, card.id]);
            }
        } else {
            // Adicionar carta ao deck
            const card = inventoryData[selectedCard];
            if (deckData.length < 20) {
                await InventarioModel.addCartaToDeck(currentDeck, card.id);

                // Atualizar quantidade no inventário
                if (card.quantidade > 1) {
                    await InventarioModel.updateInventarioQuantidade(card.id, card.quantidade - 1);
                } else {
                    // Remover do inventário se última carta
                    await db.query('DELETE FROM inventario WHERE id = ?', [card.id]);
                }
            }
        }
        
        // Atualizar interface
        await refreshData();
        renderDeck();
        renderInventory();
        resetSelection();
    } catch (error) {
        console.error('Erro ao adicionar/remover carta:', error);
    }
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

// Funções utilitárias
async function refreshData() {
    try {
        console.log('Buscando dados para usuário:', userId);
        inventoryData = await InventarioModel.getInventarioByUser(userId);
        console.log('Dados do inventário:', inventoryData);
        
        const deckAtivo = await InventarioModel.getDeckAtivo(userId);
        console.log('Deck ativo:', deckAtivo);
        
        if (deckAtivo) {
            deckData = await InventarioModel.getCartasDeck(deckAtivo.id);
            console.log('Cartas do deck:', deckData);
        }
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
    }
}

// Inicializar quando a tela de inventário for mostrada
document.addEventListener('DOMContentLoaded', () => {
    const menuInventarioOption = document.querySelector('.menu-option-inventario');
    if (menuInventarioOption) {
        menuInventarioOption.addEventListener('click', async () => {
            await initializeInventoryInterface(userId);
            // Mudar para a tela de inventário
            menuScreen.classList.remove('active');
            inventoryScreen.classList.add('active');
        });
    }
});

function resetSelection() {
    selectedCard = null;
    selectedType = null;
    cardPreview.src = '../img/icones/NENHUM.png';
    document.querySelectorAll('.deck-icon.selected, .inventory-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    updateButtons();
}

// Event Listeners para seleção de deck
deckSelectors.forEach((selector, index) => {
    selector.addEventListener('click', async () => {
        const deckNum = index + 1;
        if (currentDeck !== deckNum) {
            currentDeck = deckNum;
            await refreshData();
            renderDeck();
            resetSelection();
            
            // Atualizar visual dos seletores
            document.querySelector('.deck-selector.active')?.classList.remove('active');
            selector.classList.add('active');
        }
    });
});