const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

const query = (text, params) => pool.query(text, params);
module.exports = { query };
