const express = require('express');
const authRoutes = require('../domains/auth/routes/authRoutes');
const userRoutes = require('../domains/users/routes/userRoutes');
const noteRoutes = require('../domains/notes/routes/noteRoutes');

const router = express.Router();

// Rotas da API
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;