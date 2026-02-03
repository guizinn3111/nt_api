const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

// Rotas públicas (sem autenticação)
router.post('/', noteController.createNote);
router.get('/all', noteController.getAllNotes);

// Rotas protegidas (com autenticação)
router.get('/my-notes', authMiddleware, noteController.getUserNotes);
router.get('/:id', authMiddleware, noteController.getNoteById);
router.put('/:id', authMiddleware, noteController.updateNote);
router.delete('/:id', authMiddleware, noteController.deleteNote);

module.exports = router;