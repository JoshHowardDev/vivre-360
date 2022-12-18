const { Pool } = require('pg');

const pgURI = 'postgres://sbtnholz:okfuxBTJvnpsfYanCxK8zRK-qeVPrMuF@ruby.db.elephantsql.com/sbtnholz';
const pool = new Pool({
  connectionString: pgURI,
});

module.exports = {
  query: async (text, params, callback) => {
    const dbResponse = await pool.query(text, params, callback);
    return dbResponse;
  },
};
