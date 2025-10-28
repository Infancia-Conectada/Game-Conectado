const db = require('../controllers/database');

class InventarioModel {
    static async getInventarioByUser(userId) {
        try {
            const [rows] = await db.query(`
                SELECT i.id, i.quantidade, ac.* 
                FROM inventario i
                INNER JOIN all_cards ac ON i.id_carta = ac.id
                WHERE i.id_user = ?
            `, [userId]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar inventário:', error);
            throw error;
        }
    }

    static async getDeckAtivo(userId) {
        try {
            const [rows] = await db.query(`
                SELECT d.id, d.ativo
                FROM decks d
                INNER JOIN inventario i ON d.id_inventario = i.id
                WHERE i.id_user = ? AND d.ativo = true
            `, [userId]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar deck ativo:', error);
            throw error;
        }
    }

    static async getCartasDeck(deckId) {
        try {
            const [rows] = await db.query(`
                SELECT cd.id, cd.quantidade, ac.*
                FROM cartas_deck cd
                INNER JOIN all_cards ac ON cd.id_cartas = ac.id
                WHERE cd.id_decks = ?
            `, [deckId]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar cartas do deck:', error);
            throw error;
        }
    }

    static async addCartaToDeck(deckId, cartaId, quantidade = 1) {
        try {
            await db.query(`
                INSERT INTO cartas_deck (id_decks, id_cartas, quantidade)
                VALUES (?, ?, ?)
            `, [deckId, cartaId, quantidade]);
        } catch (error) {
            console.error('Erro ao adicionar carta ao deck:', error);
            throw error;
        }
    }

    static async removeCartaFromDeck(deckId, cartaId) {
        try {
            await db.query(`
                DELETE FROM cartas_deck
                WHERE id_decks = ? AND id_cartas = ?
            `, [deckId, cartaId]);
        } catch (error) {
            console.error('Erro ao remover carta do deck:', error);
            throw error;
        }
    }

    static async updateInventarioQuantidade(inventarioId, novaQuantidade) {
        try {
            await db.query(`
                UPDATE inventario
                SET quantidade = ?
                WHERE id = ?
            `, [novaQuantidade, inventarioId]);
        } catch (error) {
            console.error('Erro ao atualizar quantidade no inventário:', error);
            throw error;
        }
    }
}

module.exports = InventarioModel;