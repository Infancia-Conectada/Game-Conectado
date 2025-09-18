const express = require('express');
const router = express.Router();

// Importar rotas específicas
const homeRoutes = require('./home');

// Usar as rotas
router.use('/', homeRoutes);

router.get('/dashboard',function(req, res){
    res.render('dashboard');
})

module.exports = router;