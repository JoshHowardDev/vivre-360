/* eslint-disable object-curly-newline */
const db = require('../models/foodModels');
const nutrientReference = require('../../src/data/nutrientReference');

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
  const { userId, name, units, ingredientsArr } = req.body;

  // Sets query string, maps all ids into an array, then splits them with sql statements
  let readQueryString = 'SELECT * FROM food WHERE _id = ';
  const idString = ingredientsArr.map((el) => el.id).join(' OR _id = ');
  readQueryString += `${idString};`;

  const dbResponse = await db.query(readQueryString);
  const fullIngredients = dbResponse.rows;

  const newDish = { name, units, userId };
  fullIngredients.forEach((ingredient) => {
    Object.keys(ingredient).forEach((nutrient) => {
      if (nutrientReference[nutrient].type !== 'info') {
        newDish[nutrient] = (Number(newDish[nutrient]) || 0) + Number(ingredient[nutrient]);
      }
    });
  });

  // Create query string out of object keys and values
  const columnsStr = Object.keys(newDish).join(', ');
  let valuesStr = '';
  for (let i = 1; i <= Object.keys(newDish).length; i += 1) {
    valuesStr += (`$${i}, `);
  }
  valuesStr = valuesStr.slice(0, -2);
  const insertQueryString = `INSERT INTO dishes 
  (${columnsStr})
      VALUES (${valuesStr})
      RETURNING _id, name;
      `;

  const insertDbResponse = await db.query(insertQueryString, Object.values(newDish));
  const addedDish = {
    id: insertDbResponse.rows[0]._id,
    table: 'dishes',
    name: insertDbResponse.rows[0].name,
  };
  res.locals.addedDish = addedDish;
  return next();
};

module.exports = foodController;
