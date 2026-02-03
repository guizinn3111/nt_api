const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

// Rotas públicas (sem autenticação)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Rotas protegidas (com autenticação)
router.put('/profile', authMiddleware, userController.updateUser);
router.delete('/profile', authMiddleware, userController.deleteUser);

module.exports = router;