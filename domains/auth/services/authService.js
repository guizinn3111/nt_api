const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../../config/database');

class AuthService {
  async register(userData) {
    try {
      const { name, email, password } = userData;
      
      // Verificar se usuário já existe
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error('Email já está em uso');
      }

      // Hash da senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Inserir usuário
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
        [name, email, hashedPassword]
      );

      const user = result.rows[0];
      
      // Gerar token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Buscar usuário
      const result = await pool.query(
        'SELECT id, name, email, password FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error('Credenciais inválidas');
      }

      const user = result.rows[0];

      // Verificar senha
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Credenciais inválidas');
      }

      // Gerar token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Remover senha do retorno
      delete user.password;

      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();