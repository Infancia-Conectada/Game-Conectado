// Estado do jogo
let currentDeck = 1;
let selectedCard = null;
let selectedType = null; // 'deck' ou 'inventory'
let userId = 1
let inventoryScrollPosition = 0;
const CARDS_PER_PAGE = 24;

// Armazenar os dados dos 3 decks
let allDecksData = {
    deck1: [],
    deck2: [],
    deck3: []
};

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
    document.querySelectorAll('.deck-icon').forEach((icon, index) => {
        // Remover listeners antigos clonando o elemento
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        // Click para selecionar e preview
        newIcon.addEventListener('click', () => {
            const hasCard = newIcon.dataset.image && newIcon.dataset.image !== '';
            
            // Remover seleção anterior
            document.querySelectorAll('.deck-icon.selected, .inventory-icon.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            if (hasCard) {
                // Adicionar seleção à carta clicada
                newIcon.classList.add('selected');
                
                // Atualizar preview
                document.getElementById('preview-image').src = newIcon.dataset.image;
                selectedCard = index;
                selectedType = 'deck';
            } else {
                resetSelection();
            }
        });
    });
    
    // Adicionar event listeners para as cartas do inventário
    document.querySelectorAll('.inventory-icon').forEach((icon, index) => {
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        newIcon.addEventListener('click', () => {
            if (newIcon.dataset.image && newIcon.dataset.image !== '') {
                // Remover seleção anterior
                document.querySelectorAll('.deck-icon.selected, .inventory-icon.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Adicionar seleção à carta clicada
                newIcon.classList.add('selected');
                
                // Atualizar preview
                document.getElementById('preview-image').src = newIcon.dataset.image;
                selectedCard = index;
                selectedType = 'inventory';
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
                    initializeDecksData();
                    initializeDeckRadios();
                    renderDeck(currentDeck);
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
    cardPreview.src = 'img/costas-individual-semcor.png';
    document.querySelectorAll('.deck-icon.selected, .inventory-icon.selected').forEach(el => {
        el.classList.remove('selected');
    });
}

// Função para renderizar um deck específico
function renderDeck(deckNumber) {
    const deckData = allDecksData[`deck${deckNumber}`] || [];
    const deckIcons = document.querySelectorAll('.deck-icon');
    
    deckIcons.forEach((icon, index) => {
        const card = deckData[index];
        
        if (card) {
            // Atualizar com dados da carta
            icon.style.backgroundImage = `url('${card.ico_url}')`;
            icon.setAttribute('data-image', card.img_url);
            icon.setAttribute('data-card-id', card.id_carta);
            icon.setAttribute('data-deck-card-id', card.deck_card_id);
            icon.setAttribute('title', `${card.nome} (${card.elemento} - ${card.raridade})`);
            icon.className = `deck-icon ${card.elemento}`;
        } else {
            // Slot vazio
            icon.style.backgroundImage = "url('../img/icones/NENHUM.png')";
            icon.setAttribute('data-image', '');
            icon.setAttribute('data-card-id', '');
            icon.setAttribute('data-deck-card-id', '');
            icon.setAttribute('title', '');
            icon.className = 'deck-icon empty';
        }
    });
    
    // Reinicializar event listeners
    initializeCardListeners();
    
    console.log(`Deck ${deckNumber}: ${deckData.length}/20 cartas`);
}

// Função para inicializar os dados dos decks da página
function initializeDecksData() {
    // Os dados são passados pelo EJS e armazenados em elementos hidden
    const deck1Element = document.getElementById('deck1-data');
    const deck2Element = document.getElementById('deck2-data');
    const deck3Element = document.getElementById('deck3-data');
    
    if (deck1Element) allDecksData.deck1 = JSON.parse(deck1Element.textContent || '[]');
    if (deck2Element) allDecksData.deck2 = JSON.parse(deck2Element.textContent || '[]');
    if (deck3Element) allDecksData.deck3 = JSON.parse(deck3Element.textContent || '[]');
    
    console.log('Decks carregados:', allDecksData);
}

// Event Listeners para os radio buttons de seleção de deck
function initializeDeckRadios() {
    const radioButtons = document.querySelectorAll('.deck-type-row input[type="radio"]');
    
    radioButtons.forEach((radio, index) => {
        const deckNum = index + 1;
        radio.name = 'deck-selection';
        radio.value = deckNum;
        
        if (deckNum === 1) {
            radio.checked = true;
        }
        
        radio.addEventListener('change', () => {
            if (radio.checked) {
                currentDeck = deckNum;
                resetSelection();
                renderDeck(deckNum);
                console.log(`Deck ${deckNum} selecionado`);
            }
        });
    });
}

// Função para remover carta do deck (em tempo real)
async function removeCardFromDeck() {
    // Verificar se há uma carta do deck selecionada
    if (selectedType !== 'deck' || selectedCard === null) {
        console.log('Nenhuma carta do deck selecionada');
        return;
    }
    
    const deckData = allDecksData[`deck${currentDeck}`];
    const card = deckData[selectedCard];
    
    if (!card) {
        console.log('Carta não encontrada');
        return;
    }
    
    const deckCardId = card.deck_card_id;
    
    try {
        const response = await fetch(`/api/deck/card/${deckCardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Remover carta dos dados locais
            allDecksData[`deck${currentDeck}`].splice(selectedCard, 1);
            
            // Renderizar deck atualizado
            renderDeck(currentDeck);
            resetSelection();
            
            console.log('Carta removida com sucesso!');
        } else {
            console.error('Erro ao remover carta:', data.message);
        }
    } catch (error) {
        console.error('Erro ao remover carta:', error);
    }
}

// Event listener para o botão de remover
if (btnAddRemove) {
    btnAddRemove.addEventListener('click', removeCardFromDeck);
}