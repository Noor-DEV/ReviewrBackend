const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "nur4321",
  database: "yelp",
  port: 5432,
});

const query = (text, params) => pool.query(text, params);
module.exports = { query };
