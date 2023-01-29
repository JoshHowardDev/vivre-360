const { Pool } = require('pg');
require('dotenv').config();

const pgURI = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: pgURI,
});

const foodModel = {
  query: async (text, params, callback) => {
    const dbResponse = await pool.query(text, params, callback);
    return dbResponse;
  },
};

module.exports = foodModel;
