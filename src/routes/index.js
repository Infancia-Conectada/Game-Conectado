const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const apiRoutes = require('./api');

// Rota principal do jogo
router.get('/game', gameController.renderGame);
router.get('/', gameController.renderGame);

// Rotas da API
router.use('/api', apiRoutes);

module.exports = router;
