const pool = require("../../database");

async function createNote({ userId, title, description, dueDate }) {
  const query = `
    INSERT INTO notes (user_id, title, description, due_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [userId, title, description, dueDate];

  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  createNote,
};
