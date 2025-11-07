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
    return new Promise((resolve) => {
        transition.classList.add('active', 'closing');
        
        setTimeout(() => {
            fromScreen.classList.remove('active');
            
            setTimeout(() => {
                transition.classList.remove('closing');
                transition.classList.add('opening');
                toScreen.classList.add('active');
                
                setTimeout(() => {
                    transition.classList.remove('active', 'opening');
                    resolve();
                }, 1000);
            }, 1000);
        }, 1000);
    });
}

// Função para remover event listeners antigos
function cleanupModalListeners() {
    const newBtnConfirm = btnConfirmPlay.cloneNode(true);
    const newBtnCancel = btnCancelPlay.cloneNode(true);
    btnConfirmPlay.parentNode.replaceChild(newBtnConfirm, btnConfirmPlay);
    btnCancelPlay.parentNode.replaceChild(newBtnCancel, btnCancelPlay);
    return [newBtnConfirm, newBtnCancel];
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
    option.addEventListener('click', async () => {
        const optionName = option.getAttribute('data-option');
        switch(optionName) {
            case 'jogar':
                // Limpa os event listeners antigos
                const [newBtnConfirm, newBtnCancel] = cleanupModalListeners();
                
                // Mostra o modal
                playConfirmationModal.classList.add('active');
                
                // Adiciona novos event listeners
                newBtnConfirm.addEventListener('click', async () => {
                    playConfirmationModal.classList.remove('active');
                    await changeScreen(menuScreen, gameScreen);
                });
                
                newBtnCancel.addEventListener('click', () => {
                    playConfirmationModal.classList.remove('active');
                });
                break;
            case 'inventario':
                changeScreen(menuScreen, inventoryScreen);
                // initializeDeckCards();
                // initializeInventoryGrid();
                break;
            case 'loja':
                changeScreen(menuScreen, storeScreen); // Tela da loja
                break;
            case 'perfil':
                changeScreen(menuScreen, profileScreen); // Tela do perfil
                break;
            case 'tutorial':
                changeScreen(menuScreen, tutorialScreen); // Tela do tutorial
                break;
        }
    });
});

// Adicione este código ao seu arquivo menu.js
document.addEventListener('DOMContentLoaded', function () {
  const perfilOption = document.querySelector('.menu-option-perfil');
  const lojaOption = document.querySelector('.menu-option-loja');
  const inventarioOption = document.querySelector('.menu-option-inventario');
  const tutorialOption = document.querySelector('.menu-option-tutorial');
  const jogarOption = document.querySelector('.menu-option-jogar');
  const menuScreen = document.getElementById('menu-screen');

  if (perfilOption && menuScreen) {
    perfilOption.addEventListener('mouseover', function () {
      menuScreen.style.background = "url('../img/background/menu-botao-perfil.png') center/cover";
    });
    perfilOption.addEventListener('mouseout', function () {
      menuScreen.style.background = "url('../img/background/menu.png') center/cover";
    });
  }
  if (lojaOption && menuScreen) {
    lojaOption.addEventListener('mouseover', function () {
      menuScreen.style.background = "url('../img/background/menu-botao-loja.png') center/cover";
    });
    lojaOption.addEventListener('mouseout', function () {
      menuScreen.style.background = "url('../img/background/menu.png') center/cover";
    });
  }
  if (inventarioOption && menuScreen) {
    inventarioOption.addEventListener('mouseover', function () {
      menuScreen.style.background = "url('../img/background/menu-botao-inventario.png') center/cover";
    });
    inventarioOption.addEventListener('mouseout', function () {
      menuScreen.style.background = "url('../img/background/menu.png') center/cover";
    });
  }
  if (tutorialOption && menuScreen) {
    tutorialOption.addEventListener('mouseover', function () {
      menuScreen.style.background = "url('../img/background/menu-botao-tutorial.png') center/cover";
    });
    tutorialOption.addEventListener('mouseout', function () {
      menuScreen.style.background = "url('../img/background/menu.png') center/cover";
    });
  }
  if (jogarOption && menuScreen) {
    jogarOption.addEventListener('mouseover', function () {
      menuScreen.style.background = "url('../img/background/menu-botao-jogar.png') center/cover";
    });
    jogarOption.addEventListener('mouseout', function () {
      menuScreen.style.background = "url('../img/background/menu.png') center/cover";
    });
  }
});


// Inicialização do jogo
function initGame() {
    setTimeout(() => {
       changeScreen(loadingScreen,menuScreen);
    }, 3000);
}
// Inicia o jogo quando a página carregar
// window.addEventListener('load', initGame);
initGame();
// a gente fez isso pra ignorar o tempo de loading mas devemos ajustar depois (remover)