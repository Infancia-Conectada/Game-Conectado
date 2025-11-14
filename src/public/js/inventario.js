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
    const gridContainer = document.querySelector('.inventory-grid');
    gridContainer.scrollBy({
        top: -90,
        behavior: 'smooth'
    });
});

document.querySelector('.scroll-down').addEventListener('click', () => {
    const gridContainer = document.querySelector('.inventory-grid');
    gridContainer.scrollBy({
        top: 90,
        behavior: 'smooth'
    });
});

// Voltar ao menu
btnBack.addEventListener('click', () => {
    changeScreen(inventoryScreen, menuScreen);
});

// Função para inicializar os event listeners das cartas
function initializeCardListeners() {
    // Adicionar event listeners para as cartas do deck
    document.querySelectorAll('.deck-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.dataset.image) {
                document.getElementById('preview-image').src = icon.dataset.image;
            }
        });
    });
    
    // Adicionar event listeners para as cartas do inventário
    document.querySelectorAll('.inventory-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.dataset.image) {
                document.getElementById('preview-image').src = icon.dataset.image;
            }
        });
    });
}

// Observar quando a tela de inventário se torna ativa
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (inventoryScreen.classList.contains('active')) {
                // Aguardar um pouco para garantir que os elementos foram renderizados
                setTimeout(() => {
                    initializeCardListeners();
                }, 100);
            }
        }
    });
});

// Iniciar observação da tela de inventário
observer.observe(inventoryScreen, {
    attributes: true,
    attributeFilter: ['class']
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