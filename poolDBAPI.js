const { Pool } = require('pg');

const pgURI = 'postgres://sbtnholz:okfuxBTJvnpsfYanCxK8zRK-qeVPrMuF@ruby.db.elephantsql.com/sbtnholz';
const pool = new Pool({
  connectionString: pgURI,
});

const operations = {};

operations.searchFoods = (searchStr) => {
  if (!searchStr.length) return {};

  // Remove punctuation
  let sanitizedSearchStr = searchStr.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
  // Remove extra spaces
  sanitizedSearchStr = sanitizedSearchStr.replace(/\s{2,}/g, ' ').trim();
  const searchTermsArr = sanitizedSearchStr.split(' ');

  const ilikeClause = `name ILIKE '%${searchTermsArr.join('%\' AND name ILIKE \'%')}%'`;
  const queryString = `SELECT name, _id FROM food WHERE ${ilikeClause};`;
  return pool.query(queryString);
};

// Testing git

module.exports = operations;
