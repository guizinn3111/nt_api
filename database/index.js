const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("connect", () => {
  console.log("🟢 Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("🔴 PostgreSQL error", err);
  process.exit(1);
});

module.exports = pool;

