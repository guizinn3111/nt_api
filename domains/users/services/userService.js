const bcrypt = require('bcryptjs');
const pool = require('../../../config/database');

class UserService {
  async getAllUsers() {
    try {
      const result = await pool.query(
        'SELECT id, name, email, created_at, updated_at FROM users ORDER BY created_at DESC'
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const result = await pool.query(
        'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      const { name, email, password } = userData;
      let query = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP';
      let values = [];
      let paramCount = 0;

      if (name) {
        paramCount++;
        query += `, name = $${paramCount}`;
        values.push(name);
      }

      if (email) {
        // Verificar se email já está em uso por outro usuário
        const existingUser = await pool.query(
          'SELECT id FROM users WHERE email = $1 AND id != $2',
          [email, userId]
        );

        if (existingUser.rows.length > 0) {
          throw new Error('Email já está em uso por outro usuário');
        }

        paramCount++;
        query += `, email = $${paramCount}`;
        values.push(email);
      }

      if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        paramCount++;
        query += `, password = $${paramCount}`;
        values.push(hashedPassword);
      }

      paramCount++;
      query += ` WHERE id = $${paramCount} RETURNING id, name, email, updated_at`;
      values.push(userId);

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING id',
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();