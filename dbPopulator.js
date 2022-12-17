const fs = require('fs').promises;
const path = require('node:path');
const foodController = require('../server/controllers/foodController')
const Client = require('pg-native');

async function readJSON() {

  async function readAndParse(fileName, arrayName) {
    const fileData = await fs.readFile(path.resolve(__dirname, `./${fileName}.json`), 'utf8');
    return JSON.parse(fileData)[arrayName];
  }
  
  // const foodsArray = await readAndParse('foundationFoods', 'FoundationFoods')
  const foodsArray = await readAndParse('legacyFoods', 'SRLegacyFoods')

  const nutrientIdsSet = new Set(Object.keys(nutrientIds))

  for (let i = 41; i < 80; i++) {
    const newFoodObj = {};
    foodsArray[i].foodNutrients.forEach(nutrient => {
      if (nutrientIdsSet.has(nutrient.nutrient.id.toString())) {
        const nutrientDetails = nutrientIds[nutrient.nutrient.id]
  
        //Pull values for all nutrients that match
        if (nutrientDetails.usdaName.trim() === nutrient.nutrient.name.trim()) {
          newFoodObj[nutrientDetails.pgName] = nutrient.amount;
        }
      }
    });
  
    //Add name and fill in null values
    if (Object.keys(newFoodObj).length) {
      newFoodObj.name = foodsArray[i].description;
      for (const key in nutrientIds) {
        if (!newFoodObj[nutrientIds[key].pgName]) newFoodObj[nutrientIds[key].pgName] = null;
      }
      addNewFood(newFoodObj);
    }
  }

  
}



readJSON();

addNewFood = (foodInputObj) => {
  // const foodInputObj = {
  //   name: 'Apple',
  //   calories: 1,
  //   fat: 2, 
  //   sat_fat: 3,
  //   trans_fat: 4,
  //   cholesterol: 5,
  //   sodium: 6,
  //   carbs: 7,
  //   fiber: 8,
  //   sugars: 9,
  //   protein: 2,
  //   caffeine: 1,
  //   a: 3, 
  //   b1: 0.085, 
  //   b2: 0.3, 
  //   b3: 0.4, 
  //   b5: 1, 
  //   b6: 2, 
  //   b9: 4, 
  //   b12: 6, 
  //   c: 7, 
  //   choline: 8, 
  //   d: 9, 
  //   e: 1, 
  //   k: 2, 
  //   calcium: 3, 
  //   copper: 6, 
  //   iron: 9,
  //   magnesium: 1,
  //   manganese: .1,
  //   phosphorus: .111,
  //   potassium: .1111,
  //   selenium: .11111,
  //   zinc: 10,
  // }  

  //Destructure input object variables
  const {
    name, calories, fat, sat_fat, trans_fat, cholesterol, sodium, carbs, fiber, 
    sugars, protein, caffeine, a, b1, b2, b3, b5, b6, b9, b12, c, choline, d,  
    e, k, calcium, copper, iron, magnesium, manganese, phosphorus, potassium, 
    selenium, zinc
  } = foodInputObj;

  //Create new object with 
  const newFood = {
    name, calories, fat, sat_fat, trans_fat, cholesterol, sodium, carbs, fiber, 
    sugars, protein, caffeine, a, b1, b2, b3, b5, b6, b9, b12, c, choline, d,  
    e, k, calcium, copper, iron, magnesium, manganese, phosphorus, potassium, 
    selenium, zinc
  };

  //Create query string
  const columnsStr = Object.keys(newFood).join(', ');
  let valuesStr = ''
  for (let i = 1; i <= Object.keys(newFood).length; i++) {
    valuesStr += ('$' + i + ', ')
  }
  valuesStr = valuesStr.slice(0, -2);
  const queryString = `INSERT INTO food 
      (${columnsStr})
      VALUES (${valuesStr})
      RETURNING _id, name;
    `

    const client = new Client();
    client.connectSync('postgres://sbtnholz:okfuxBTJvnpsfYanCxK8zRK-qeVPrMuF@ruby.db.elephantsql.com/sbtnholz');
    const dbResponse = client.querySync(queryString, Object.values(newFood))
    client.end();
    // const newFoodId = dbResponse.rows[0]['_id'];   
    console.log(`Added ID: ${dbResponse[0]['_id']}, Food: ${dbResponse[0].name}`)

  // //Add new food to db and return db id
  // db.query(queryString, Object.values(newFood))
  // .then((dbResponse) => {
  //   const newFoodId = dbResponse.rows[0]['_id'];
  //   console.log('Added new food id ', newFoodId)
  //   return;
  // })
  // .then(() => {
  //   db.end();
  // })
};

async function randfetch() {

  const prop = 'selenium'

  const queryString = `SELECT ${prop} FROM food WHERE _id = 2`

  //Add new food to db and return db id
  const newFoodId = await db.query(queryString) 
    console.log(newFoodId.rows[0][prop])
    console.log(Number(newFoodId.rows[0][prop]) + 10)
}

const nutrientIds = {
  1008: {pgName: 'calories', usdaName: 'Energy', units: 'kcal'},
  1004: {pgName: 'fat', usdaName: 'Total lipid (fat)'},
  1258: {pgName: 'sat_fat', usdaName: 'Fatty acids, total saturated', units: 'g'},
  1257: {pgName: 'trans_fat', usdaName: 'Fatty acids, total trans', units: 'g'},
  1253: {pgName: 'cholesterol', usdaName: 'Cholesterol', units: 'mg'},
  1093: {pgName: 'sodium', usdaName: 'Sodium, Na', units: 'mg'},
  1005: {pgName: 'carbs', usdaName: 'Carbohydrate, by difference', units: 'g'},
  1079: {pgName: 'fiber', usdaName: 'Fiber, total dietary', units: 'g'},
  2000: {pgName: 'sugars', usdaName: 'Sugars, total including NLEA', units: 'g'},
  1003: {pgName: 'protein', usdaName: 'Protein', units: 'g'},
  1057: {pgName: 'caffeine', usdaName: 'Caffeine', units: 'mg'},
  1104: {pgName: 'a', usdaName: 'Vitamin A, IU', units: 'iu'},
  1165: {pgName: 'b1', usdaName: 'Thiamin', units: 'mg'},
  1166: {pgName: 'b2', usdaName: 'Riboflavin', units: 'mg'},
  1167: {pgName: 'b3', usdaName: 'Niacin', units: 'mg'},
  1170: {pgName: 'b5', usdaName: 'Pantothenic acid', units: 'mg'},
  1175: {pgName: 'b6', usdaName: 'Vitamin B-6', units: 'mg'},
  1177: {pgName: 'b9', usdaName: 'Folate, total', units: 'ug'},
  1178: {pgName: 'b12', usdaName: 'Vitamin B-12', units: 'ug'},
  1162: {pgName: 'c', usdaName: 'Vitamin C, total ascorbic acid', units: 'mg'},
  1180: {pgName: 'choline', usdaName: 'Choline, total', units: 'mg'},
  1110: {pgName: 'd', usdaName: 'Vitamin D (D2 + D3), International Units', units: 'iu'},
  1109: {pgName: 'e', usdaName: 'Vitamin E (alpha-tocopherol)', units: 'mg'},
  1185: {pgName: 'k', usdaName: 'Vitamin K (phylloquinone)', units: 'ug'},
  1087: {pgName: 'calcium', usdaName: 'Calcium, Ca', units: 'mg'},
  1098: {pgName: 'copper', usdaName: 'Copper, Cu', units: 'mg'},
  1089: {pgName: 'iron', usdaName: 'Iron, Fe', units: 'mg'},
  1090: {pgName: 'magnesium', usdaName: 'Magnesium, Mg', units: 'mg'},
  1101: {pgName: 'manganese', usdaName: 'Manganese, Mn', units: 'mg'},
  1091: {pgName: 'phosphorus', usdaName: 'Phosphorus, P', units: 'mg'},
  1092: {pgName: 'potassium', usdaName: 'Potassium, K', units: 'mg'},
  1103: {pgName: 'selenium', usdaName: 'Selenium, Se', units: 'ug'},
  1095: {pgName: 'zinc', usdaName: 'Zinc, Zn', units: 'mg'},
}

// addNewFood()