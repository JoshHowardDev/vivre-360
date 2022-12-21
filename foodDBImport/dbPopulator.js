const fs = require('fs').promises;
const path = require('node:path');
const db = require('./dbAPI');
const usdaReference = require('./usdaReference');

// Create function to read and parse a json file
async function readAndParse(fileName) {
  const fileData = await fs.readFile(path.resolve(__dirname, `./${fileName}.json`), 'utf8');
  return JSON.parse(fileData);
}

async function transferFoodsToDB(iterations) {
  // Create foods array from USDA data
  const usdaData = await readAndParse('usda/USDALegacyFoods');
  const foodsArray = usdaData.SRLegacyFoods;

  // Find the last ID added to the database
  const usdaStatusObj = await readAndParse('notes/usdaStatus');
  const { lastIdAdded } = usdaStatusObj;

  // Establish how many to add at a time
  const transferQuantity = 100;

  for (let i = lastIdAdded + 1; i <= lastIdAdded + transferQuantity; i += 1) {
    const newFoodObj = {};

    // Iterate thru the nutrients on the usda obj, checking if each matches a nutrient in the pg db
    foodsArray[i].foodNutrients.forEach((nutrient) => {
      if (usdaReference.nutrientIdsSet.has(nutrient.nutrient.id.toString())) {
        const nutrientConnectionDetails = usdaReference.nutrientIds[nutrient.nutrient.id];
        // For all nutrients that match, add to newFoodObj
        if (nutrientConnectionDetails.usdaName.trim() === nutrient.nutrient.name.trim()) {
          newFoodObj[nutrientConnectionDetails.pgName] = nutrient.amount;
        }
      }
    });

    // Add food name and fill in null values
    if (Object.keys(newFoodObj).length) {
      newFoodObj.name = foodsArray[i].description;
      usdaReference.nutrientIdsSet.forEach((id) => {
        if (!newFoodObj[usdaReference.nutrientIds[id].pgName]) {
          newFoodObj[usdaReference.nutrientIds[id].pgName] = null;
        }
      });

      db.addNewFood(newFoodObj);
    }
  }
  usdaStatusObj.lastIdAdded += transferQuantity;
  await fs.writeFile(path.resolve(__dirname, './notes/usdaStatus.json'), JSON.stringify(usdaStatusObj));

  // Create setTimeout to overcome db error when inserting too many items too fast
  if (iterations > 1) {
    setTimeout(() => {
      transferFoodsToDB(iterations - 1);
    }, 120000);
  }
}

transferFoodsToDB(5);
