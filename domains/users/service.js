const pool = require("../../database");
const bcrypt = require("bcrypt");

async function createUser({ email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;

  const values = [email, hashedPassword];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};