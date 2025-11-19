// ========== GAME ENGINE - SISTEMA COMPLETO DO JOGO ==========

// ========== DADOS DAS CARTAS ==========
const CARD_DATA = {
    // Monstros
    monsters: {
        // Água
        1: { id: 1, nome: "Aquavor", elemento: "agua", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        2: { id: 2, nome: "Tydrill", elemento: "agua", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        3: { id: 3, nome: "Hidralisk", elemento: "agua", nivel: 4, raridade: "incomum", vida: 6, dano: 4 },
        4: { id: 4, nome: "Rainscour", elemento: "agua", nivel: 4, raridade: "incomum", vida: 6, dano: 4 },
        5: { id: 5, nome: "Ocearion", elemento: "agua", nivel: 6, raridade: "raro", vida: 8, dano: 6 },
        
        // Eletricidade
        6: { id: 6, nome: "Thundril", elemento: "eletricidade", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        7: { id: 7, nome: "Voltrik", elemento: "eletricidade", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        8: { id: 8, nome: "Joltriss", elemento: "eletricidade", nivel: 4, raridade: "incomum", vida: 6, dano: 4 },
        9: { id: 9, nome: "Sparkon", elemento: "eletricidade", nivel: 4, raridade: "incomum", vida: 6, dano: 4 },
        10: { id: 10, nome: "Zaptron", elemento: "eletricidade", nivel: 6, raridade: "raro", vida: 8, dano: 6 },
        
        // Fogo
        11: { id: 11, nome: "Ashgrim", elemento: "fogo", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        12: { id: 12, nome: "Volkris", elemento: "fogo", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        13: { id: 13, nome: "Pyrrak", elemento: "fogo", nivel: 4, raridade: "incomum", vida: 6, dano: 4 },
        14: { id: 14, nome: "Flarehorn", elemento: "fogo", nivel: 6, raridade: "raro", vida: 8, dano: 6 },
        15: { id: 15, nome: "Scaldrix", elemento: "fogo", nivel: 6, raridade: "raro", vida: 8, dano: 6 },
        
        // Terra
        16: { id: 16, nome: "Mudrak", elemento: "terra", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        17: { id: 17, nome: "Oritur", elemento: "terra", nivel: 2, raridade: "comum", vida: 4, dano: 2 },
        18: { id: 18, nome: "Crustorr", elemento: "terra", nivel: 4, raridade: "incomum", vida: 6, dano: 4 },
        19: { id: 19, nome: "Terradom", elemento: "terra", nivel: 4, raridade: "incomum", vida: 6, dano: 4 },
        20: { id: 20, nome: "Quakmor", elemento: "terra", nivel: 6, raridade: "raro", vida: 8, dano: 6 }
    },
    
    // Itens
    items: {
        // Água
        21: { id: 21, nome: "Suplemento Azul +1", elemento: "agua", nivel: 1, tipo: "dano", valor: 1 },
        22: { id: 22, nome: "Suplemento Azul +2", elemento: "agua", nivel: 3, tipo: "dano", valor: 2 },
        23: { id: 23, nome: "Esfera Proteção Azul +1", elemento: "agua", nivel: 1, tipo: "vida", valor: 1 },
        24: { id: 24, nome: "Esfera Proteção Azul +2", elemento: "agua", nivel: 3, tipo: "vida", valor: 2 },
        
        // Eletricidade
        25: { id: 25, nome: "Suplemento Amarelo +1", elemento: "eletricidade", nivel: 1, tipo: "dano", valor: 1 },
        26: { id: 26, nome: "Suplemento Amarelo +2", elemento: "eletricidade", nivel: 3, tipo: "dano", valor: 2 },
        27: { id: 27, nome: "Esfera Proteção Amarela +1", elemento: "eletricidade", nivel: 1, tipo: "vida", valor: 1 },
        28: { id: 28, nome: "Esfera Proteção Amarela +2", elemento: "eletricidade", nivel: 3, tipo: "vida", valor: 2 },
        
        // Fogo
        29: { id: 29, nome: "Suplemento Vermelho +1", elemento: "fogo", nivel: 1, tipo: "dano", valor: 1 },
        30: { id: 30, nome: "Suplemento Vermelho +2", elemento: "fogo", nivel: 3, tipo: "dano", valor: 2 },
        31: { id: 31, nome: "Esfera Proteção Vermelha +1", elemento: "fogo", nivel: 1, tipo: "vida", valor: 1 },
        32: { id: 32, nome: "Esfera Proteção Vermelha +2", elemento: "fogo", nivel: 3, tipo: "vida", valor: 2 },
        
        // Terra
        33: { id: 33, nome: "Suplemento Verde +1", elemento: "terra", nivel: 1, tipo: "dano", valor: 1 },
        34: { id: 34, nome: "Suplemento Verde +2", elemento: "terra", nivel: 3, tipo: "dano", valor: 2 },
        35: { id: 35, nome: "Esfera Proteção Verde +1", elemento: "terra", nivel: 1, tipo: "vida", valor: 1 },
        36: { id: 36, nome: "Esfera Proteção Verde +2", elemento: "terra", nivel: 3, tipo: "vida", valor: 2 }
    }
};

// Cenários
const SCENARIOS = [
    { id: 1, nome: "Ilha", elemento1: "agua", elemento2: null, buffs: { agua: { dano: 2, vida: 2 } } },
    { id: 2, nome: "Deserto Estático", elemento1: "eletricidade", elemento2: null, buffs: { eletricidade: { dano: 2, vida: 2 } } },
    { id: 3, nome: "Vale Vulcânico", elemento1: "fogo", elemento2: null, buffs: { fogo: { dano: 2, vida: 2 } } },
    { id: 4, nome: "Floresta", elemento1: "terra", elemento2: null, buffs: { terra: { dano: 2, vida: 2 } } },
    { id: 5, nome: "Pântano", elemento1: "agua", elemento2: "terra", buffs: { agua: { dano: 1, vida: 1 }, terra: { dano: 1, vida: 1 } } },
    { id: 6, nome: "Cerrado Vulcânico", elemento1: "eletricidade", elemento2: "fogo", buffs: { eletricidade: { dano: 1, vida: 1 }, fogo: { dano: 1, vida: 1 } } },
    { id: 7, nome: "Neblina", elemento1: "neutro", elemento2: null, buffs: {} }
];

// Tabela de vantagens elementares
const ELEMENT_ADVANTAGES = {
    agua: "fogo",        // Água vence Fogo
    fogo: "terra",       // Fogo vence Terra
    terra: "eletricidade", // Terra vence Eletricidade
    eletricidade: "agua" // Eletricidade vence Água
};

// ========== CLASSE DO MOTOR DO JOGO ==========
class GameEngine {
    constructor() {
        this.playerScore = 0;
        this.opponentScore = 0;
        this.playerDeck = [];
        this.opponentDeck = [];
        this.scenarioDeck = [];
        this.playerHand = [];
        this.opponentHand = [];
        this.playerDiscard = [];
        this.opponentDiscard = [];
        this.scenarioDiscard = [];
        this.currentScenario = null;
        this.playerSelection = { monster: null, item: null };
        this.opponentSelection = { monster: null, item: null };
        this.turnPhase = 'waiting'; // waiting, selecting, revealing, battling, scoring
        this.roundNumber = 0;
        this.gameActive = false;
    }

    // Inicializar jogo com deck do jogador
    initializeGame(playerDeckData) {
        console.log('Inicializando jogo com deck:', playerDeckData);
        
        // Converter dados do banco para formato do jogo
        this.playerDeck = this.convertDeckData(playerDeckData);
        
        // Criar deck do oponente (simulado - mesmas cartas por enquanto)
        this.opponentDeck = this.convertDeckData(playerDeckData);
        
        // Criar deck de cenários
        this.scenarioDeck = [...SCENARIOS];
        
        // Embaralhar todos os decks
        this.shuffleDeck(this.playerDeck);
        this.shuffleDeck(this.opponentDeck);
        this.shuffleDeck(this.scenarioDeck);
        
        // Comprar 5 cartas iniciais para cada jogador
        this.drawCards('player', 5);
        this.drawCards('opponent', 5);
        
        // Resetar pontuações
        this.playerScore = 0;
        this.opponentScore = 0;
        this.roundNumber = 0;
        
        // Ativar o jogo
        this.gameActive = true;
        
        console.log('Jogo inicializado!');
        console.log('Mão do jogador:', this.playerHand);
        console.log('Mão do oponente:', this.opponentHand);
        
        // Iniciar primeiro turno
        this.startNewTurn();
    }

    // Converter dados do banco para formato do jogo
    convertDeckData(deckData) {
        return deckData.map(card => {
            const cardId = card.id_carta || card.id;
            const tipo = card.tipo;
            
            // Buscar informações completas da carta
            if (tipo === 'monstro') {
                const monsterData = CARD_DATA.monsters[cardId];
                return {
                    ...card,
                    ...monsterData,
                    cardType: 'monster'
                };
            } else if (tipo === 'item') {
                const itemData = CARD_DATA.items[cardId];
                return {
                    ...card,
                    ...itemData,
                    cardType: 'item'
                };
            }
            
            return card;
        });
    }

    // Embaralhar deck
    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    // Comprar cartas
    drawCards(player, count) {
        const deck = player === 'player' ? this.playerDeck : this.opponentDeck;
        const hand = player === 'player' ? this.playerHand : this.opponentHand;
        const discard = player === 'player' ? this.playerDiscard : this.opponentDiscard;
        
        for (let i = 0; i < count && hand.length < 5; i++) {
            if (deck.length === 0) {
                // Reembaralhar descarte se deck acabou
                if (discard.length > 0) {
                    deck.push(...discard);
                    discard.length = 0;
                    this.shuffleDeck(deck);
                } else {
                    break; // Não há mais cartas
                }
            }
            
            if (deck.length > 0) {
                hand.push(deck.shift());
            }
        }
    }

    // Iniciar novo turno
    startNewTurn() {
        if (!this.gameActive) return;
        
        this.roundNumber++;
        console.log(`\n=== TURNO ${this.roundNumber} ===`);
        
        // Revelar carta de cenário
        if (this.scenarioDeck.length === 0) {
            // Reembaralhar descarte de cenários
            this.scenarioDeck.push(...this.scenarioDiscard);
            this.scenarioDiscard.length = 0;
            this.shuffleDeck(this.scenarioDeck);
        }
        
        this.currentScenario = this.scenarioDeck.shift();
        console.log('Cenário revelado:', this.currentScenario.nome);
        
        // Resetar seleções
        this.playerSelection = { monster: null, item: null };
        this.opponentSelection = { monster: null, item: null };
        
        // Mudar para fase de seleção
        this.turnPhase = 'selecting';
        
        // Oponente faz seleção automática (IA simples)
        this.opponentAutoSelect();
    }

    // Oponente seleciona cartas automaticamente
    opponentAutoSelect() {
        // Selecionar um monstro aleatório
        const monsters = this.opponentHand.filter(card => card.cardType === 'monster');
        if (monsters.length > 0) {
            const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
            this.opponentSelection.monster = randomMonster;
        }
        
        // 50% de chance de selecionar um item
        if (Math.random() > 0.5) {
            const items = this.opponentHand.filter(card => card.cardType === 'item');
            if (items.length > 0) {
                const randomItem = items[Math.floor(Math.random() * items.length)];
                this.opponentSelection.item = randomItem;
            }
        }
        
        console.log('Oponente selecionou suas cartas');
    }

    // Jogador seleciona uma carta
    selectCard(cardIndex) {
        if (this.turnPhase !== 'selecting') {
            console.log('Não é hora de selecionar cartas');
            return false;
        }
        
        const card = this.playerHand[cardIndex];
        if (!card) return false;
        
        if (card.cardType === 'monster') {
            this.playerSelection.monster = card;
            console.log('Monstro selecionado:', card.nome);
            return true;
        } else if (card.cardType === 'item') {
            // Só pode selecionar item se já tiver monstro
            if (this.playerSelection.monster) {
                this.playerSelection.item = card;
                console.log('Item selecionado:', card.nome);
                return true;
            } else {
                console.log('Selecione um monstro primeiro!');
                return false;
            }
        }
        
        return false;
    }

    // Desselecionar carta
    deselectCard(cardType) {
        if (cardType === 'monster') {
            this.playerSelection.monster = null;
            this.playerSelection.item = null; // Se remover monstro, remove item também
        } else if (cardType === 'item') {
            this.playerSelection.item = null;
        }
    }

    // Verificar se jogador pode confirmar jogada
    canConfirmPlay() {
        return this.playerSelection.monster !== null && this.turnPhase === 'selecting';
    }

    // Confirmar jogada do jogador
    confirmPlay() {
        if (!this.canConfirmPlay()) {
            console.log('Não é possível confirmar a jogada ainda');
            return null;
        }
        
        // Mudar para fase de revelação
        this.turnPhase = 'revealing';
        
        console.log('Jogador confirmou a jogada!');
        console.log('Jogador:', this.playerSelection);
        console.log('Oponente:', this.opponentSelection);
        
        // Calcular resultado da batalha
        const battleResult = this.resolveBattle();
        
        return battleResult;
    }

    // Resolver batalha
    resolveBattle() {
        this.turnPhase = 'battling';
        
        // Calcular stats finais de cada lado
        const playerStats = this.calculateFinalStats('player');
        const opponentStats = this.calculateFinalStats('opponent');
        
        console.log('\n--- BATALHA ---');
        console.log('Jogador:', playerStats);
        console.log('Oponente:', opponentStats);
        
        // Aplicar dano
        playerStats.vidaFinal = playerStats.vida - opponentStats.dano;
        opponentStats.vidaFinal = opponentStats.vida - playerStats.dano;
        
        // Determinar vencedor do turno
        let roundWinner = null;
        
        if (playerStats.vidaFinal > 0 && opponentStats.vidaFinal <= 0) {
            // Jogador venceu
            roundWinner = 'player';
            this.playerScore++;
            console.log('🏆 JOGADOR VENCEU O TURNO!');
        } else if (opponentStats.vidaFinal > 0 && playerStats.vidaFinal <= 0) {
            // Oponente venceu
            roundWinner = 'opponent';
            this.opponentScore++;
            console.log('💀 OPONENTE VENCEU O TURNO!');
        } else {
            // Empate (ambos vivos ou ambos mortos)
            roundWinner = 'draw';
            console.log('⚖️ EMPATE!');
        }
        
        const battleResult = {
            roundWinner,
            playerStats,
            opponentStats,
            playerScore: this.playerScore,
            opponentScore: this.opponentScore,
            scenario: this.currentScenario
        };
        
        // Verificar se o jogo acabou
        if (this.playerScore >= 3) {
            battleResult.gameWinner = 'player';
            this.gameActive = false;
            console.log('\n🎉 JOGADOR VENCEU O JOGO! 🎉');
        } else if (this.opponentScore >= 3) {
            battleResult.gameWinner = 'opponent';
            this.gameActive = false;
            console.log('\n😢 OPONENTE VENCEU O JOGO! 😢');
        }
        
        return battleResult;
    }

    // Calcular stats finais (com buffs de cenário, item e vantagem)
    calculateFinalStats(player) {
        const selection = player === 'player' ? this.playerSelection : this.opponentSelection;
        const monster = selection.monster;
        const item = selection.item;
        
        let dano = monster.dano;
        let vida = monster.vida;
        const elemento = monster.elemento;
        
        // Aplicar bônus do item
        if (item) {
            if (item.tipo === 'dano') {
                dano += item.valor;
            } else if (item.tipo === 'vida') {
                vida += item.valor;
            }
        }
        
        // Aplicar buffs do cenário
        if (this.currentScenario && this.currentScenario.buffs[elemento]) {
            const buff = this.currentScenario.buffs[elemento];
            dano += buff.dano || 0;
            vida += buff.vida || 0;
        }
        
        // Calcular vantagem elemental
        const opponentElement = player === 'player' 
            ? this.opponentSelection.monster.elemento 
            : this.playerSelection.monster.elemento;
        
        let vantagem = 0;
        if (ELEMENT_ADVANTAGES[elemento] === opponentElement) {
            vantagem = 2; // Dano extra por vantagem
            dano += vantagem;
        }
        
        return {
            monstro: monster.nome,
            elemento,
            item: item ? item.nome : 'Nenhum',
            dano,
            vida,
            vantagem,
            cenarioBuff: this.currentScenario.buffs[elemento] || null
        };
    }

    // Limpar mesa após turno
    endTurn() {
        this.turnPhase = 'scoring';
        
        // Remover cartas jogadas das mãos e colocar no descarte
        if (this.playerSelection.monster) {
            const monsterIndex = this.playerHand.indexOf(this.playerSelection.monster);
            if (monsterIndex > -1) {
                this.playerDiscard.push(this.playerHand.splice(monsterIndex, 1)[0]);
            }
        }
        
        if (this.playerSelection.item) {
            const itemIndex = this.playerHand.indexOf(this.playerSelection.item);
            if (itemIndex > -1) {
                this.playerDiscard.push(this.playerHand.splice(itemIndex, 1)[0]);
            }
        }
        
        if (this.opponentSelection.monster) {
            const monsterIndex = this.opponentHand.indexOf(this.opponentSelection.monster);
            if (monsterIndex > -1) {
                this.opponentDiscard.push(this.opponentHand.splice(monsterIndex, 1)[0]);
            }
        }
        
        if (this.opponentSelection.item) {
            const itemIndex = this.opponentHand.indexOf(this.opponentSelection.item);
            if (itemIndex > -1) {
                this.opponentDiscard.push(this.opponentHand.splice(itemIndex, 1)[0]);
            }
        }
        
        // Colocar cenário no descarte
        if (this.currentScenario) {
            this.scenarioDiscard.push(this.currentScenario);
        }
        
        // Comprar até ter 5 cartas novamente
        this.drawCards('player', 5 - this.playerHand.length);
        this.drawCards('opponent', 5 - this.opponentHand.length);
        
        console.log('Mesa limpa. Cartas compradas.');
        console.log(`Placar: Jogador ${this.playerScore} x ${this.opponentScore} Oponente`);
        
        // Se o jogo ainda está ativo, começar novo turno
        if (this.gameActive) {
            setTimeout(() => {
                this.startNewTurn();
            }, 100);
        }
    }

    // Obter estado atual do jogo
    getGameState() {
        return {
            playerScore: this.playerScore,
            opponentScore: this.opponentScore,
            playerHand: this.playerHand,
            opponentHandCount: this.opponentHand.length,
            playerDeckCount: this.playerDeck.length,
            opponentDeckCount: this.opponentDeck.length,
            scenarioDeckCount: this.scenarioDeck.length,
            currentScenario: this.currentScenario,
            playerSelection: this.playerSelection,
            turnPhase: this.turnPhase,
            roundNumber: this.roundNumber,
            gameActive: this.gameActive
        };
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.GameEngine = GameEngine;
    window.CARD_DATA = CARD_DATA;
    window.SCENARIOS = SCENARIOS;
}
