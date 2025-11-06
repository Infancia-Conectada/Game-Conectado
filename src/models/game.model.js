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
                    i.id as inventory_id,
                    i.id_carta,
                    tc.nome,
                    tc.tipo,
                    tc.raridade,
                    tc.elemento,
                    tc.img_url,
                    tc.ico_url
                FROM inventarios i
                INNER JOIN todas_cartas tc ON i.id_carta = tc.id
                WHERE i.id_usuario = ?
                ORDER BY tc.elemento, tc.raridade, tc.nome
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
    // getScenarioCards: async () => {
    //     try {
    //         const [scenarios] = await database.query('SELECT * FROM deck_cenario ORDER BY elemento1, elemento2');
    //         return scenarios;
    //     } catch (error) {
    //         console.error('Erro ao buscar cenários:', error);
    //         throw new Error('Falha ao buscar cenários');
    //     }
    // },

    // /**
    //  * Busca todas as cartas disponíveis no jogo
    //  * @returns {Promise<Array>} Array com todas as cartas
    //  */
    // getAllCards: async () => {
    //     try {
    //         const [cards] = await database.query('SELECT * FROM all_cards ORDER BY elemento, raridade, nome');
    //         return cards;
    //     } catch (error) {
    //         console.error('Erro ao buscar cartas:', error);
    //         throw new Error('Falha ao buscar cartas');
    //     }
    // }
};

module.exports = gameModel;
