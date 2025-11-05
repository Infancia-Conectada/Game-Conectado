const gameModel = require('../models/game.model');

const gameController = {
    renderGame: async (req, res) => {
        try {
            // Buscar dados necessários para o jogo
            const [
                inventario,
                cenarios,
                allCards
            ] = await Promise.all([
                gameModel.getInventoryWithCards(),
            ]);

            // Renderizar a view com os dados
            res.render('game', {
                title: 'Game Conectado - Jogo',
                inventario,
                cenarios,
                allCards
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
