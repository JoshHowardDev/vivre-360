/* eslint-disable no-loop-func */
const fs = require('fs').promises;
const path = require('node:path');
const db = require('./dbAPI');

// Create function to read and parse a json file
async function readAndParse(fileName) {
  const fileData = await fs.readFile(path.resolve(__dirname, `./${fileName}.json`), 'utf8');
  return JSON.parse(fileData);
}

async function transferFoodsToDB() {
  // Create foods array from USDA data
  const usdaData = await readAndParse('usda/USDALegacyFoods');
  const foodsArray = usdaData.SRLegacyFoods;

  // Find the last ID added to the database
  const usdaStatusObj = await readAndParse('usdaStatus');
  const { lastIdAdded } = usdaStatusObj;

  // Establish how many to add at a time
  const transferQuantity = 93;

  let queryString = 'INSERT INTO servings (food_id, name, gramWeight) VALUES ';
  let queryValue = 1;
  const queryParams = [];

  // For each food
  for (let i = lastIdAdded + 1; i <= lastIdAdded + transferQuantity; i += 1) {
    // Iterate thru the nutrients on the usda obj, checking if each matches a nutrient in the pg db
    if (foodsArray[i] && foodsArray[i].foodPortions) {
      foodsArray[i].foodPortions.forEach((portion) => {
        queryString += `($${queryValue++}, $${queryValue++}, $${queryValue++}), `;
        queryParams.push(Number(i), portion.modifier, Number(portion.gramWeight));
      });
    }
  }
  queryString = `${queryString.slice(0, -2)};`;
  db.query(queryString, queryParams);
  usdaStatusObj.lastIdAdded += transferQuantity;
  await fs.writeFile(path.resolve(__dirname, './usdaStatus.json'), JSON.stringify(usdaStatusObj));

  // // Create setTimeout to overcome db error when inserting too many items too fast
  // if (iterations > 1) {
  //   setTimeout(() => {
  //     transferFoodsToDB(iterations - 1);
  //   }, 60);
  // }
}

transferFoodsToDB();
