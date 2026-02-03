const pool = require('../../../config/database');

class NoteService {
  async createNote(userId, noteData) {
    try {
      const { title, content } = noteData;

      const result = await pool.query(
        'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, content, userId]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAllNotesByUser(userId) {
    try {
      const result = await pool.query(
        'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getAllNotes() {
    try {
      const result = await pool.query(`
        SELECT n.*, u.name as user_name, u.email as user_email 
        FROM notes n 
        JOIN users u ON n.user_id = u.id 
        ORDER BY n.created_at DESC
      `);

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getNoteById(noteId, userId) {
    try {
      const result = await pool.query(
        'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
        [noteId, userId]
      );

      if (result.rows.length === 0) {
        throw new Error('Nota não encontrada');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateNote(noteId, userId, noteData) {
    try {
      const { title, content } = noteData;
      let query = 'UPDATE notes SET updated_at = CURRENT_TIMESTAMP';
      let values = [];
      let paramCount = 0;

      if (title) {
        paramCount++;
        query += `, title = $${paramCount}`;
        values.push(title);
      }

      if (content !== undefined) {
        paramCount++;
        query += `, content = $${paramCount}`;
        values.push(content);
      }

      paramCount++;
      query += ` WHERE id = $${paramCount}`;
      values.push(noteId);

      paramCount++;
      query += ` AND user_id = $${paramCount} RETURNING *`;
      values.push(userId);

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        throw new Error('Nota não encontrada');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(noteId, userId) {
    try {
      const result = await pool.query(
        'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id',
        [noteId, userId]
      );

      if (result.rows.length === 0) {
        throw new Error('Nota não encontrada');
      }

      return { message: 'Nota deletada com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NoteService();