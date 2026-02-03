const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ 
          error: 'Nome, email e senha são obrigatórios' 
        });
      }

      const result = await authService.register({ name, email, password });
      
      res.status(201).json({
        message: 'Usuário criado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(400).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email e senha são obrigatórios' 
        });
      }

      const result = await authService.login({ email, password });
      
      res.json({
        message: 'Login realizado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(401).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }
}

module.exports = new AuthController();