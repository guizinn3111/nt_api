const noteService = require('../services/noteService');

class NoteController {
  async createNote(req, res) {
    try {
      const { title, content, user_id } = req.body;

      if (!title) {
        return res.status(400).json({ 
          error: 'Título é obrigatório' 
        });
      }

      if (!user_id) {
        return res.status(400).json({ 
          error: 'ID do usuário é obrigatório' 
        });
      }

      const note = await noteService.createNote(user_id, { title, content });
      
      res.status(201).json({
        message: 'Nota criada com sucesso',
        data: note
      });
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }

  async getUserNotes(req, res) {
    try {
      const userId = req.user.id; // virá do auth depois
      
      const notes = await noteService.getAllNotesByUser(userId);
      
      res.json({
        message: 'Notas do usuário listadas com sucesso',
        data: notes
      });
    } catch (error) {
      console.error('Erro ao listar notas do usuário:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }

  async getAllNotes(req, res) {
    try {
      const notes = await noteService.getAllNotes();
      
      res.json({
        message: 'Todas as notas listadas com sucesso',
        data: notes
      });
    } catch (error) {
      console.error('Erro ao listar todas as notas:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }

  async getNoteById(req, res) {
    try {
      const userId = req.user.id; // virá do auth depois
      const { id } = req.params;

      const note = await noteService.getNoteById(id, userId);
      
      res.json({
        message: 'Nota encontrada',
        data: note
      });
    } catch (error) {
      console.error('Erro ao buscar nota:', error);
      const statusCode = error.message === 'Nota não encontrada' ? 404 : 500;
      res.status(statusCode).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }

  async updateNote(req, res) {
    try {
      const userId = req.user.id; // virá do auth depois
      const { id } = req.params;
      const noteData = req.body;

      const updatedNote = await noteService.updateNote(id, userId, noteData);
      
      res.json({
        message: 'Nota atualizada com sucesso',
        data: updatedNote
      });
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      const statusCode = error.message === 'Nota não encontrada' ? 404 : 500;
      res.status(statusCode).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }

  async deleteNote(req, res) {
    try {
      const userId = req.user.id; // virá do auth depois
      const { id } = req.params;

      const result = await noteService.deleteNote(id, userId);
      
      res.json({
        message: result.message,
        data: null
      });
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      const statusCode = error.message === 'Nota não encontrada' ? 404 : 500;
      res.status(statusCode).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }
}

module.exports = new NoteController();