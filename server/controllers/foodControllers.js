const db = require('../models/foodModels');

const foodController = {};

foodController.searchFoods = async (req, res, next) => {
  const searchStr = req.query.q;

  if (!searchStr.length) return {};

  // Remove punctuation
  let sanitizedSearchStr = searchStr.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
  // Remove extra spaces
  sanitizedSearchStr = sanitizedSearchStr.replace(/\s{2,}/g, ' ').trim();
  const searchTermsArr = sanitizedSearchStr.split(' ');

  const ilikeClause = `name ILIKE '%${searchTermsArr.join('%\' AND name ILIKE \'%')}%'`;
  const queryString = `SELECT name, _id FROM food WHERE ${ilikeClause};`;
  console.log(queryString);
  const dbResponse = await db.query(queryString);
  res.locals.results = dbResponse.rows;
  return next();
};

module.exports = foodController;
