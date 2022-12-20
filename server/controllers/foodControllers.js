const db = require('../models/foodModels');

const foodController = {};

foodController.searchFoods = async (req, res, next) => {
  const searchStr = req.query.q;

  if (!searchStr.length) return next();

  // Remove punctuation
  let sanitizedSearchStr = searchStr.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
  // Remove extra spaces
  sanitizedSearchStr = sanitizedSearchStr.replace(/\s{2,}/g, ' ').trim();
  const searchTermsArr = sanitizedSearchStr.split(' ');

  const ilikeClause = `name ILIKE '%${searchTermsArr.join('%\' AND name ILIKE \'%')}%'`;
  const queryString = `SELECT name, _id FROM food WHERE ${ilikeClause};`;
  const dbResponse = await db.query(queryString);
  res.locals.results = dbResponse.rows;
  return next();
};

foodController.getNutrients = async (req, res, next) => {
  const foodId = req.query.id;

  // Filter for IDs greater than 5 digits to prevent injection
  if (!foodId.length || foodId.length > 6) return next();

  const queryString = `SELECT * FROM food WHERE _id = ${foodId};`;
  const dbResponse = await db.query(queryString);
  res.locals.results = dbResponse.rows;
  return next();
};

foodController.addDish = async (req, res, next) => {
  const ingredientsArr = req.body;
  console.log(ingredientsArr);
  return next();
}

module.exports = foodController;
