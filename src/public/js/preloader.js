// Sistema de pré-carregamento de imagens
class ImagePreloader {
    constructor() {
        this.images = [];
        this.loadedCount = 0;
        this.totalCount = 0;
        this.progressBar = null;
        this.progressFill = null;
    }

    // Define todas as imagens do jogo
    setImageList() {
        this.images = [
            // Amuletos
            '/img/amuletos/AGUA0.png',
            '/img/amuletos/AGUA1.png',
            '/img/amuletos/AGUA2A.png',
            '/img/amuletos/AGUA2B.png',
            '/img/amuletos/AGUA2C.png',
            '/img/amuletos/AGUA2D.png',
            '/img/amuletos/AGUA2E.png',
            '/img/amuletos/FOGO0.png',
            '/img/amuletos/FOGO1.png',
            '/img/amuletos/FOGO2A.png',
            '/img/amuletos/FOGO2B.png',
            '/img/amuletos/FOGO2C.png',
            '/img/amuletos/FOGO2D.png',
            '/img/amuletos/FOGO2E.png',
            '/img/amuletos/RAIO0.png',
            '/img/amuletos/RAIO1.png',
            '/img/amuletos/RAIO2A.png',
            '/img/amuletos/RAIO2B.png',
            '/img/amuletos/RAIO2C.png',
            '/img/amuletos/RAIO2D.png',
            '/img/amuletos/RAIO2E.png',
            '/img/amuletos/TERRA0.png',
            '/img/amuletos/TERRA1.png',
            '/img/amuletos/TERRA2A.png',
            '/img/amuletos/TERRA2B.png',
            '/img/amuletos/TERRA2C.png',
            '/img/amuletos/TERRA2D.png',
            '/img/amuletos/TERRA2E.png',
            // Avatares
            'avatar-opponent.png',
            'avatar-player.png',
            // Background
            '/img/background/amuleto-molde.png',
            '/img/background/amuleto.png',
            '/img/background/inventario-molde.png',
            '/img/background/inventario.png',
            '/img/background/JOGAR-AGUA-TERRA.png',
            '/img/background/JOGAR-AGUA.png',
            '/img/background/JOGAR-CAIXA0.png',
            '/img/background/JOGAR-CAIXA1.png',
            '/img/background/JOGAR-CAIXA2.png',
            '/img/background/JOGAR-CAIXA3.png',
            '/img/background/JOGAR-FOGO-RAIO.png',
            '/img/background/JOGAR-FOGO.png',
            '/img/background/JOGAR-MESA.png',
            '/img/background/JOGAR-NEBLINA.png',
            '/img/background/JOGAR-NEUTRO.png',
            '/img/background/JOGAR-RAIO.png',
            '/img/background/JOGAR-TERRA.png',
            '/img/background/loading.png',
            '/img/background/loja-molde.png',
            '/img/background/loja.png',
            '/img/background/menu-botao-inventario.png',
            '/img/background/menu-botao-jogar.png',
            '/img/background/menu-botao-loja.png',
            '/img/background/menu-botao-perfil.png',
            '/img/background/menu-botao-tutorial.png',
            '/img/background/menu.png',
            '/img/background/menu0.png',
            '/img/background/perfil-molde.png',
            '/img/background/perfil.png',
            '/img/background/tutorial.png',
            // Cenários
            '/img/cenarios/1-AGA.png',
            '/img/cenarios/1-ELT.png',
            '/img/cenarios/1-FGO.png',
            '/img/cenarios/1-TER.png',
            '/img/cenarios/2-AGA+TER.png',
            '/img/cenarios/2-FGO+ELT.png',
            '/img/cenarios/2-NEBLINA.png',
            // Costas
            '/img/costas-cenario.png',
            '/img/costas-individual-semcor.png',
            '/img/costas-individual.png',
            // Ícones
            '/img/icones/AGA-1-Aquavor.png',
            '/img/icones/AGA-1-Tydrill.png',
            '/img/icones/AGA-2-Hidralisk.png',
            '/img/icones/AGA-2-Rainscour.png',
            '/img/icones/AGA-3-Ocearion.png',
            '/img/icones/AGA-D1.png',
            '/img/icones/AGA-D2.png',
            '/img/icones/AGA-V1.png',
            '/img/icones/AGA-V2.png',
            '/img/icones/ELT-1-Thundril.png',
            '/img/icones/ELT-1-Voltrik.png',
            '/img/icones/ELT-2-Joltriss.png',
            '/img/icones/ELT-2-Sparkon.png',
            '/img/icones/ELT-3-Zaptron.png',
            '/img/icones/ELT-D1.png',
            '/img/icones/ELT-D2.png',
            '/img/icones/ELT-V1.png',
            '/img/icones/ELT-V2.png',
            '/img/icones/FGO-1-Ashgrim.png',
            '/img/icones/FGO-1-Volkris.png',
            '/img/icones/FGO-2-Pyrrak.png',
            '/img/icones/FGO-3-Flarehorn.png',
            '/img/icones/FGO-3-Scaldrix.png',
            '/img/icones/FGO-D1.png',
            '/img/icones/FGO-D2.png',
            '/img/icones/FGO-V1.png',
            '/img/icones/FGO-V2.png',
            '/img/icones/NENHUM.png',
            '/img/icones/TER-1-Mudrak.png',
            '/img/icones/TER-1-Oritur.png',
            '/img/icones/TER-2-Crustorr.png',
            '/img/icones/TER-2-Terradom.png',
            '/img/icones/TER-3-Quakmor.png',
            '/img/icones/TER-D1.png',
            '/img/icones/TER-D2.png',
            '/img/icones/TER-V1.png',
            '/img/icones/TER-V2.png',
            // Inputs
            '/img/inputs/botao-adicionar.png',
            '/img/inputs/botao-amuleto.png',
            '/img/inputs/botao-cancelar.png',
            '/img/inputs/botao-comprar.png',
            '/img/inputs/botao-continuar.png',
            '/img/inputs/botao-forjar.png',
            '/img/inputs/botao-inventario.png',
            '/img/inputs/botao-loja.png',
            '/img/inputs/botao-menu-inventario.png',
            '/img/inputs/botao-menu-perfil.png',
            '/img/inputs/botao-menu-small.png',
            '/img/inputs/botao-reciclar.png',
            '/img/inputs/botao-remover.png',
            '/img/inputs/deck1.png',
            '/img/inputs/deck2.png',
            '/img/inputs/deck3.png',
            // Itens
            '/img/itens/AGA-dano+1.png',
            '/img/itens/AGA-dano+2.png',
            '/img/itens/AGA-vida+1.png',
            '/img/itens/AGA-vida+2.png',
            '/img/itens/ELT-dano+1.png',
            '/img/itens/ELT-dano+2.png',
            '/img/itens/ELT-vida+1.png',
            '/img/itens/ELT-vida+2.png',
            '/img/itens/FGO-dano+1.png',
            '/img/itens/FGO-dano+2.png',
            '/img/itens/FGO-vida+1.png',
            '/img/itens/FGO-vida+2.png',
            '/img/itens/TER-dano+1.png',
            '/img/itens/TER-dano+2.png',
            '/img/itens/TER-vida+1.png',
            '/img/itens/TER-vida+2.png',
            // Monstros
            '/img/monstro/AGA-1-Aquavor.png',
            '/img/monstro/AGA-1-Tydrill.png',
            '/img/monstro/AGA-2-Hidralisk.png',
            '/img/monstro/AGA-2-Rainscour.png',
            '/img/monstro/AGA-3-Ocearion.png',
            '/img/monstro/ELT-1-Thundril.png',
            '/img/monstro/ELT-1-Voltrik.png',
            '/img/monstro/ELT-2-Joltriss.png',
            '/img/monstro/ELT-2-Sparkon.png',
            '/img/monstro/ELT-3-Zaptron.png',
            '/img/monstro/ELT-3-Zaptron.png',
            '/img/monstro/FGO-1-Ashgrim.png',
            '/img/monstro/FGO-1-Volkris.png',
            '/img/monstro/FGO-2-Pyrrak.png',
            '/img/monstro/FGO-3-Flarehorn.png',
            '/img/monstro/FGO-3-Scaldrix.png',
            '/img/monstro/TER-1-Mudrak.png',
            '/img/monstro/TER-1-Oritur.png',
            '/img/monstro/TER-2-Crustorr.png',
            '/img/monstro/TER-2-Terradom.png',
            '/img/monstro/TER-3-Quakmor.png',
            //transições
            '/img/transicoes/PORTA1A.png',
            '/img/transicoes/PORTA1B.png',
            '/img/transicoes/PORTA2.png',
            '/img/transicoes/PORTA3.png',
        ];
        this.totalCount = this.images.length;
    }

    // Inicializa o preloader pegando elementos do DOM
    init() {
        this.progressBar = document.querySelector('.loading-bar');
        this.progressFill = document.querySelector('.loading-progress');
        
        if (!this.progressBar || !this.progressFill) {
            console.error('Elementos de progresso não encontrados no DOM');
            return false;
        }
        return true;
    }

    // Atualiza a barra de progresso
    updateProgress() {
        const percentage = (this.loadedCount / this.totalCount) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = percentage + '%';
        }
    }

    // Carrega uma imagem e retorna uma Promise
    loadImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => {
                this.loadedCount++;
                this.updateProgress();
                resolve(true);
            };
            
            img.onerror = () => {
                this.loadedCount++;
                this.updateProgress();
                console.warn(`Erro ao carregar imagem: ${url}`);
                resolve(false);
            };
            
            img.src = url;
        });
    }

    // Carrega todas as imagens
    async loadAll() {
        this.setImageList();
        
        if (!this.init()) {
            console.error('Falha ao inicializar preloader');
            return false;
        }

        this.loadedCount = 0;
        this.updateProgress();

        // Carrega as imagens em paralelo (5 por vez para otimizar)
        const batchSize = 5;
        for (let i = 0; i < this.images.length; i += batchSize) {
            const batch = this.images.slice(i, i + batchSize);
            await Promise.all(batch.map(url => this.loadImage(url)));
        }

        return true;
    }
}

// Instancia global do preloader
const imagePreloader = new ImagePreloader();
