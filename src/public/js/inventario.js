// Estado do jogo
let currentDeck = 1;
let selectedCard = null;
let selectedType = null; // 'deck' ou 'inventory'
let userId = 1
let inventoryScrollPosition = 0;
const CARDS_PER_PAGE = 24;

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

// Inicializar quando a tela de inventário for mostrada
document.addEventListener('DOMContentLoaded', () => {
    const menuInventarioOption = document.querySelector('.menu-option-inventario');
    if (menuInventarioOption) {
        menuInventarioOption.addEventListener('click', async () => {
            // Mudar para a tela de inventário
            menuScreen.classList.remove('active');
            inventoryScreen.classList.add('active');
            
            // Adicionar event listeners para as cartas
            document.querySelectorAll('.deck-icon').forEach(icon => {
                icon.addEventListener('click', () => {
                    if (icon.dataset.image) {
                        document.getElementById('preview-image').src = icon.dataset.image;
                    }
                });
            });
            document.querySelectorAll('.inventory-icon').forEach(icon => {
                icon.addEventListener('click', () => {
                    if (icon.dataset.image) {
                        document.getElementById('preview-image').src = icon.dataset.image;
                    }
                });
            });
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
            resetSelection();
            
            // Atualizar visual dos seletores
            document.querySelector('.deck-selector.active')?.classList.remove('active');
            selector.classList.add('active');
        }
    });
});