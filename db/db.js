const { Pool } = require("pg");

const pool = new Pool();
pool.connect(process.env.DATABASE_URL);

const query = (text, params) => pool.query(text, params);
module.exports = { query };
