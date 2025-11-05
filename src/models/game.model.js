const database = require('../config/database');

const gameModel = {
    /**
     * Busca o inventário do jogador com todas as informações das cartas
     * @returns {Promise<Array>} Array com as cartas do inventário e suas informações
     */
    getInventoryWithCards: async () => {
        try {
            const [inventory] = await database.query(`
                SELECT 
                    i.id as inventory_id,
                    c.id as card_id,
                    c.nome,
                    c.tipo,
                    c.raridade,
                    c.elemento,
                    c.img_url,
                    c.ico_url
                FROM inventario i
                INNER JOIN all_cards c ON i.id_carta = c.id
                ORDER BY c.elemento, c.raridade, c.nome
            `);
            
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
