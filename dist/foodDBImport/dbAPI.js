/* eslint-disable no-console */
/* eslint-disable object-property-newline */
/* eslint-disable camelcase */
require('dotenv').config();
var Client = require('pg-native');
var pgURI = process.env.DATABASE_URL;
var operations = {};
operations.query = function (text, params) {
    var client = new Client();
    client.connectSync(pgURI);
    var dbResponse = client.querySync(text, params);
    client.end();
    return dbResponse;
};
operations.addNewFood = function (foodInputObj) {
    // Destructure input object variables to sanitize
    var name = foodInputObj.name, calories = foodInputObj.calories, fat = foodInputObj.fat, sat_fat = foodInputObj.sat_fat, trans_fat = foodInputObj.trans_fat, cholesterol = foodInputObj.cholesterol, sodium = foodInputObj.sodium, carbs = foodInputObj.carbs, fiber = foodInputObj.fiber, sugars = foodInputObj.sugars, protein = foodInputObj.protein, caffeine = foodInputObj.caffeine, a = foodInputObj.a, b1 = foodInputObj.b1, b2 = foodInputObj.b2, b3 = foodInputObj.b3, b5 = foodInputObj.b5, b6 = foodInputObj.b6, b9 = foodInputObj.b9, b12 = foodInputObj.b12, c = foodInputObj.c, choline = foodInputObj.choline, d = foodInputObj.d, e = foodInputObj.e, k = foodInputObj.k, calcium = foodInputObj.calcium, copper = foodInputObj.copper, iron = foodInputObj.iron, magnesium = foodInputObj.magnesium, manganese = foodInputObj.manganese, phosphorus = foodInputObj.phosphorus, potassium = foodInputObj.potassium, selenium = foodInputObj.selenium, zinc = foodInputObj.zinc;
    // Create new object with sanitized values
    var newFood = {
        name: name,
        calories: calories,
        fat: fat,
        sat_fat: sat_fat,
        trans_fat: trans_fat,
        cholesterol: cholesterol,
        sodium: sodium,
        carbs: carbs,
        fiber: fiber,
        sugars: sugars,
        protein: protein,
        caffeine: caffeine,
        a: a,
        b1: b1,
        b2: b2,
        b3: b3,
        b5: b5,
        b6: b6,
        b9: b9,
        b12: b12,
        c: c,
        choline: choline,
        d: d,
        e: e,
        k: k,
        calcium: calcium,
        copper: copper,
        iron: iron,
        magnesium: magnesium,
        manganese: manganese,
        phosphorus: phosphorus,
        potassium: potassium,
        selenium: selenium,
        zinc: zinc,
    };
    // Create query string out of object keys and values
    var columnsStr = Object.keys(newFood).join(', ');
    var valuesStr = '';
    for (var i = 1; i <= Object.keys(newFood).length; i += 1) {
        valuesStr += ("$".concat(i, ", "));
    }
    valuesStr = valuesStr.slice(0, -2);
    var queryString = "INSERT INTO food \n      (".concat(columnsStr, ")\n      VALUES (").concat(valuesStr, ")\n      RETURNING _id, name;\n      ");
    var client = new Client();
    client.connectSync(pgURI);
    var dbResponse = client.querySync(queryString, Object.values(newFood));
    client.end();
    console.log("Added ID: ".concat(dbResponse[0]._id, ", Food: ").concat(dbResponse[0].name));
};
module.exports = operations;
