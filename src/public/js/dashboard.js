let currentScreen = 'initialScreen';
let coins = 150;

function updateCoins() {
    document.getElementById('coinAmount').textContent = coins;
}

function showScreen(screenName) {
    const transition = document.getElementById('transition');
    transition.classList.add('active', 'door-animation');
    
    setTimeout(() => {
        // Esconder tela atual
        document.getElementById(currentScreen).classList.remove('active');
        
        // Mostrar nova tela
        const newScreen = screenName + 'Screen';
        document.getElementById(newScreen).classList.add('active');
        currentScreen = newScreen;
        
        // Mostrar/esconder display de moedas
        const coinsDisplay = document.getElementById('coinsDisplay');
        if (['inventoryScreen', 'shopScreen', 'profileScreen', 'gameScreen'].includes(newScreen)) {
            coinsDisplay.style.display = 'block';
        } else {
            coinsDisplay.style.display = 'none';
        }
        
        // Remover overlay de transição
        transition.classList.remove('active', 'door-animation');
    }, 500);
}

function buyItem(item) {
    let cost = 0;
    let message = '';
    
    switch(item) {
        case 'booster':
            cost = 50;
            message = 'Booster Normal';
            break;
        case 'premium':
            cost = 120;
            message = 'Booster Premium';
            break;
        case 'themed':
            cost = 80;
            message = 'Booster Temático';
            break;
        case 'special':
            cost = 200;
            message = 'Carta da Semana';
            break;
    }
    
    if (coins >= cost) {
        coins -= cost;
        updateCoins();
        alert(`Você comprou: ${message}!`);
    } else {
        alert('Moedas insuficientes!');
    }
}

// Gerar cartas do inventário
function generateInventory() {
    const grid = document.getElementById('inventoryGrid');
    for (let i = 0; i < 47; i++) {
        const card = document.createElement('div');
        card.className = 'inventory-card';
        card.style.background = `hsl(${Math.random() * 360}, 70%, 70%)`;
        grid.appendChild(card);
    }
    
    // Adicionar slots vazios
    for (let i = 47; i < 100; i++) {
        const card = document.createElement('div');
        card.className = 'inventory-card';
        card.style.background = '#95a5a6';
        card.style.opacity = '0.3';
        grid.appendChild(card);
    }
}

// Inicializar
window.onload = function() {
    generateInventory();
    updateCoins();
};

