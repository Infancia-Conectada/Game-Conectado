const gameModel = require('../models/game.model');

const gameController = {
    renderGame: async (req, res) => {
        try {
            // Por enquanto, vamos usar um userId fixo para teste
            const userId = 1; // TODO: Pegar o userId da sessão
            const deckId = 1; // TODO: Permitir selecionar diferentes decks

            // Buscar cartas do deck selecionado
            const deckCards = await gameModel.getDeckCards(userId, deckId);
            console.log (JSON.stringify(deckCards));
            // Renderizar a view com os dados
            res.render('game', {
                title: 'Game Conectado - Jogo',
                deckCards: deckCards || [], // Garantir que sempre seja um array
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
