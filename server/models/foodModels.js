const { Pool } = require('pg');
require('dotenv').config();

const pgURI = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: pgURI,
});

module.exports = {
  query: async (text, params, callback) => {
    const dbResponse = await pool.query(text, params, callback);
    return dbResponse;
  },
};
