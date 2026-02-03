const userService = require('../services/userService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      
      res.json({
        message: 'Usuários listados com sucesso',
        data: users
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      res.json({
        message: 'Usuário encontrado',
        data: user
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      const statusCode = error.message === 'Usuário não encontrado' ? 404 : 500;
      res.status(statusCode).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.user.id; // virá do auth depois
      const userData = req.body;

      const updatedUser = await userService.updateUser(userId, userData);
      
      res.json({
        message: 'Usuário atualizado com sucesso',
        data: updatedUser
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      const statusCode = error.message === 'Usuário não encontrado' ? 404 : 400;
      res.status(statusCode).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.user.id; // virá do auth depois
      
      const result = await userService.deleteUser(userId);
      
      res.json({
        message: result.message,
        data: null
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      const statusCode = error.message === 'Usuário não encontrado' ? 404 : 500;
      res.status(statusCode).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }
}

module.exports = new UserController();