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
router.post('/deck/card', async (req, res) => {
    try {
        const { userId, deckId, cardId } = req.body;
        
        console.log('POST /api/deck/card recebido:', { userId, deckId, cardId });
        
        if (!userId || !deckId || !cardId) {
            console.log('Dados incompletos recebidos');
            return res.status(400).json({ 
                success: false, 
                message: 'Dados incompletos' 
            });
        }
        
        const result = await gameModel.addCardToDeck(userId, deckId, cardId);
        console.log('Resultado do addCardToDeck:', result);
        res.json(result);
    } catch (error) {
        console.error('Erro ao adicionar carta ao deck:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Rota para remover carta do deck
router.delete('/deck/card/:deckCardId', async (req, res) => {
    try {
        const deckCardId = parseInt(req.params.deckCardId);
        const result = await gameModel.removeCardFromDeck(deckCardId);
        
        res.json({ 
            success: true, 
            message: result.message
        });
    } catch (error) {
        console.error('Erro ao remover carta do deck:', error);
        res.status(500).json({ success: false, error: 'Erro ao remover carta do deck' });
    }
});

module.exports = router;