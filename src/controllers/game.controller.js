const gameModel = require('../models/game.model');

const gameController = {
    renderGame: async (req, res) => {
        try {
            // Por enquanto, vamos usar um userId fixo para teste
            const userId = 1; // TODO: Pegar o userId da sessão

            // Buscar cartas do inventario
            const inventoryWithCards = await gameModel.getInventoryWithCards(userId);
            // Buscar todos os 3 decks
            const allDecks = await gameModel.getAllDecksWithCards(userId);
            
            // Renderizar a view com os dados
            res.render('game', {
                inventoryWithCards: inventoryWithCards || [], // Garantir que sempre seja um array
                deck1Cards: allDecks.deck1 || [],
                deck2Cards: allDecks.deck2 || [],
                deck3Cards: allDecks.deck3 || [],
            });
        } catch (error) {
            console.error('Erro ao carregar dados do jogo:', error);
            res.status(500).render('404', {
                title: 'Erro - Game Conectado',
                message: 'Erro ao carregar o jogo. Por favor, tente novamente.'
            });
        }
    }
};

module.exports = gameController;
