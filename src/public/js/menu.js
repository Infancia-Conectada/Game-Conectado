// Elementos
const loadingScreen = document.getElementById('loading-screen');
const menuScreen = document.getElementById('menu-screen');
const transition = document.getElementById('transition');
const menuOptions = document.querySelectorAll('.menu-option');
const tooltip = document.getElementById('menu-tooltip');
const tooltipText = document.getElementById('tooltip-text');

// Textos do tooltip
const tooltipTexts = {
    jogar: 'Jogar',
    inventario: 'Inventário',
    loja: 'Loja',
    perfil: 'Perfil',
    tutorial: 'Tutorial'
};

// Função para mudar de tela com transição
function changeScreen(fromScreen, toScreen) {
    transition.classList.add('active', 'closing');
    
    setTimeout(() => {
        fromScreen.classList.remove('active');
        
        setTimeout(() => {
            transition.classList.remove('closing');
            transition.classList.add('opening');
            toScreen.classList.add('active');
            
            setTimeout(() => {
                transition.classList.remove('active', 'opening');
            }, 1000);
        }, 1000);
    }, 1000);
}

// Inicialização do jogo
function initGame() {
    setTimeout(() => {
        changeScreen(loadingScreen, menuScreen);
    }, 3000);
}

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
        if (optionName === 'inventario') {
            changeScreen(menuScreen, inventoryScreen);
            initializeDeckCards();
            initializeInventory();
        }
    });
});

// Inicia o jogo quando a página carregar
window.addEventListener('load', initGame);