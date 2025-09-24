// Controle do estado do jogo
let gameState = 'loading';
let isTransitioning = false;

// Função para mostrar transição de porta
function showDoorTransition(callback) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const doorTransition = document.getElementById('doorTransition');
    
    // Ativar transição
    doorTransition.classList.add('active');
    
    // Aguardar fechamento completo
    setTimeout(() => {
        if (callback) callback();
        
        // Aguardar 1 segundo e abrir as portas
        setTimeout(() => {
            doorTransition.classList.remove('active');
            
            // Aguardar abertura completa
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
        // Aqui você pode implementar a lógica para cada opção
        switch(option) {
            case 'jogar':
                console.log('Iniciando jogo...');
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

// Inicialização do jogo
window.addEventListener('load', () => {
    // Simular loading por 3 segundos
    setTimeout(() => {
        gameState = 'menu';
        
        // Primeira transição de porta
        showDoorTransition(() => {
            // Esconder tela de loading
            document.getElementById('loadingScreen').style.display = 'none';
            
            // Mostrar menu principal
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
}, true);