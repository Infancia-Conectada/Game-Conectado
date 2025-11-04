const gameController = {
    renderGame: async (req, res) => {

        res.render('game', {
            title: 'Game Conectado - Jogo',
            cenarios,
            inventario,
            allCards
        });

    }
};

module.exports = gameController;
