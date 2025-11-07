const express = require('express');
const router = express.Router();
const gameModel = require('../models/game.model');

// Rota para buscar dados do deck e inventário
router.get('/deck/:deckId', async (req, res) => {
    try {
        const userId = req.session.userId || 1; // TODO: Usar sessão real
        const deckId = parseInt(req.params.deckId);

        // Buscar dados do deck e inventário
        const [deckCards, inventory] = await Promise.all([
            gameModel.getDeckCards(userId, deckId),
            gameModel.getInventoryWithCards(userId)
        ]);

        res.json({
            deckCards,
            inventory
        });
    } catch (error) {
        console.error('Erro ao buscar dados do deck:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do deck' });
    }
});

// Rota para adicionar carta ao deck
router.post('/deck/:deckId/card', async (req, res) => {
    try {
        const userId = req.session.userId || 1; // TODO: Usar sessão real
        const deckId = parseInt(req.params.deckId);
        const { cardId, position } = req.body;

        // TODO: Implementar adição de carta ao deck
        
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao adicionar carta ao deck:', error);
        res.status(500).json({ error: 'Erro ao adicionar carta ao deck' });
    }
});

// Rota para remover carta do deck
router.delete('/deck/:deckId/card/:cardId', async (req, res) => {
    try {
        const userId = req.session.userId || 1; // TODO: Usar sessão real
        const deckId = parseInt(req.params.deckId);
        const cardId = parseInt(req.params.cardId);

        // TODO: Implementar remoção de carta do deck
        
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao remover carta do deck:', error);
        res.status(500).json({ error: 'Erro ao remover carta do deck' });
    }
});

module.exports = router;