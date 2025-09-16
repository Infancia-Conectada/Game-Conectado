const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Rota principal - Landing Page
router.get('/', homeController.index);

// Rota para página sobre (preparada para futuro)
router.get('/about', homeController.about);

// Rota para página de serviços (preparada para futuro)
router.get('/services', homeController.services);

// Rota para processar formulário de contato
router.post('/contact', homeController.contact);

module.exports = router;