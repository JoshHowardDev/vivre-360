/* eslint-disable no-console */
/* eslint-disable object-property-newline */
/* eslint-disable camelcase */
require('dotenv').config();
const Client = require('pg-native');

const pgURI = process.env.DATABASE_URL;

const operations = {};

operations.query = (text, params) => {
  const client = new Client();
  client.connectSync(pgURI);
  const dbResponse = client.querySync(text, params);
  client.end();
  return dbResponse;
};

operations.addNewFood = (foodInputObj) => {
  // Destructure input object variables to sanitize
  const {
    name, calories, fat, sat_fat, trans_fat, cholesterol, sodium, carbs, fiber,
    sugars, protein, caffeine, a, b1, b2, b3, b5, b6, b9, b12, c, choline, d,
    e, k, calcium, copper, iron, magnesium, manganese, phosphorus, potassium,
    selenium, zinc,
  } = foodInputObj;

  // Create new object with sanitized values
  const newFood = {
    name, calories, fat, sat_fat, trans_fat, cholesterol, sodium, carbs, fiber,
    sugars, protein, caffeine, a, b1, b2, b3, b5, b6, b9, b12, c, choline, d,
    e, k, calcium, copper, iron, magnesium, manganese, phosphorus, potassium,
    selenium, zinc,
  };

  // Create query string out of object keys and values
  const columnsStr = Object.keys(newFood).join(', ');
  let valuesStr = '';
  for (let i = 1; i <= Object.keys(newFood).length; i += 1) {
    valuesStr += (`$${i}, `);
  }
  valuesStr = valuesStr.slice(0, -2);
  const queryString = `INSERT INTO food 
      (${columnsStr})
      VALUES (${valuesStr})
      RETURNING _id, name;
      `;

  const client = new Client();
  client.connectSync(pgURI);
  const dbResponse = client.querySync(queryString, Object.values(newFood));
  client.end();

  console.log(`Added ID: ${dbResponse[0]._id}, Food: ${dbResponse[0].name}`);
};

module.exports = operations;
