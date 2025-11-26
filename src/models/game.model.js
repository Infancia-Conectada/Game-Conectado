const database = require('../config/database');

const gameModel = {
    /**
     * Busca os decks individuais do jogador com todas as informações das cartas
     * @param {number} userId - ID do usuário
     * @param {number} deckId - ID do deck selecionado
     * @returns {Promise<Array>} Array com as cartas do deck e suas informações
     */
    getDeckCards: async (userId, deckId) => {
        try {
            const [deckCards] = await database.query(`
                SELECT 
                    di.id as deck_card_id,
                    di.id_carta,
                    tc.*
                FROM decks_individuais di
                INNER JOIN decks d ON di.id_deck = d.id
                INNER JOIN inventarios i ON d.id_inventario = i.id
                INNER JOIN todas_cartas tc ON di.id_carta = tc.id
                WHERE i.id_usuario = ? AND d.id = ?
            `, [userId, deckId]);
            
            return deckCards;
        } catch (error) {
            console.error('Erro ao buscar cartas do deck:', error);
            throw new Error('Falha ao buscar cartas do deck');
        }
    },

    /**
     * Busca o inventário do jogador com todas as informações das cartas
     * @returns {Promise<Array>} Array com as cartas do inventário e suas informações
     */
    getInventoryWithCards: async (userId) => {
        try {
            const [inventory] = await database.query(`
                SELECT 
                    MIN(i.id) as inventory_id,
                    i.id_carta,
                    tc.nome,
                    tc.tipo,
                    tc.raridade,
                    tc.elemento,
                    tc.nivel,
                    tc.img_url,
                    tc.ico_url,
                    COUNT(*) as quantity
                FROM inventarios i
                INNER JOIN todas_cartas tc ON i.id_carta = tc.id
                WHERE i.id_usuario = ?
                GROUP BY i.id_carta, tc.nome, tc.tipo, tc.raridade, tc.elemento, tc.nivel, tc.img_url, tc.ico_url
                ORDER BY tc.elemento, tc.tipo DESC, tc.nivel DESC
            `, [userId]);
            return inventory;
        } catch (error) {
            console.error('Erro ao buscar inventário:', error);
            throw new Error('Falha ao buscar inventário');
        }
    },

    /**
     * Busca todas as cartas de cenário disponíveis
     * @returns {Promise<Array>} Array com os cenários
     */

    /**
     * Adiciona uma carta ao deck individual
     * @param {number} userId - ID do usuário
     * @param {number} deckId - ID do deck (1, 2 ou 3)
     * @param {number} cardId - ID da carta
     * @returns {Promise<Object>} Resultado da operação com dados da carta
     */
    addCardToDeck: async (userId, deckId, cardId) => {
        try {
            // Verificar número de cartas no deck
            const [deckCards] = await database.query(`
                SELECT COUNT(*) as total
                FROM decks_individuais di
                INNER JOIN decks d ON di.id_deck = d.id
                INNER JOIN inventarios i ON d.id_inventario = i.id
                WHERE i.id_usuario = ? AND d.id = ?
            `, [userId, deckId]);
            
            if (deckCards[0].total >= 20) {
                return { success: false, message: 'Deck já possui 20 cartas' };
            }
            
            // Buscar o id correto do deck baseado no userId e deckId
            const [deckInfo] = await database.query(`
                SELECT d.id
                FROM decks d
                INNER JOIN inventarios i ON d.id_inventario = i.id
                WHERE i.id_usuario = ? AND d.id = ?
            `, [userId, deckId]);
            
            if (!deckInfo || deckInfo.length === 0) {
                return { success: false, message: 'Deck não encontrado' };
            }
            
            // Inserir carta no deck
            const [result] = await database.query(`
                INSERT INTO decks_individuais (id_deck, id_carta)
                VALUES (?, ?)
            `, [deckInfo[0].id, cardId]);
            
            // Buscar dados da carta adicionada
            const [cardData] = await database.query(`
                SELECT 
                    di.id as deck_card_id,
                    di.id_carta,
                    tc.*
                FROM decks_individuais di
                INNER JOIN todas_cartas tc ON di.id_carta = tc.id
                WHERE di.id = ?
            `, [result.insertId]);
            
            return { 
                success: true, 
                message: 'Carta adicionada ao deck com sucesso',
                card: cardData[0]
            };
        } catch (error) {
            console.error('Erro ao adicionar carta ao deck:', error);
            throw new Error('Falha ao adicionar carta ao deck');
        }
    },

    /**
     * Remove uma carta do deck individual
     * @param {number} deckCardId - ID da entrada em decks_individuais
     * @returns {Promise<Object>} Resultado da operação
     */
    removeCardFromDeck: async (deckCardId) => {
        try {
            // Remover carta do deck_individual
            await database.query(`
                DELETE FROM decks_individuais WHERE id = ?
            `, [deckCardId]);
            
            return { success: true, message: 'Carta removida do deck com sucesso' };
        } catch (error) {
            console.error('Erro ao remover carta do deck:', error);
            throw new Error('Falha ao remover carta do deck');
        }
    },

    /**
     * Busca todos os decks do usuário com suas cartas
     * @param {number} userId - ID do usuário
     * @returns {Promise<Object>} Objeto com os 3 decks
     */
    getAllDecksWithCards: async (userId) => {
        try {
            const decks = {};
            
            // Buscar os 3 decks
            for (let deckId = 1; deckId <= 3; deckId++) {
                const [deckCards] = await database.query(`
                    SELECT 
                        di.id as deck_card_id,
                        di.id_carta,
                        tc.*
                    FROM decks_individuais di
                    INNER JOIN decks d ON di.id_deck = d.id
                    INNER JOIN inventarios i ON d.id_inventario = i.id
                    INNER JOIN todas_cartas tc ON di.id_carta = tc.id
                    WHERE i.id_usuario = ? AND d.id = ?
                    ORDER BY di.id
                `, [userId, deckId]);
                
                decks[`deck${deckId}`] = deckCards;
            }
            
            return decks;
        } catch (error) {
            console.error('Erro ao buscar todos os decks:', error);
            throw new Error('Falha ao buscar todos os decks');
        }
    }
};

module.exports = gameModel;
