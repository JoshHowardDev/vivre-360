const express = require('express');
const foodController = require('./controllers/foodControllers');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Express main page');
});

app.get('/api/searchFoods', foodController.searchFoods, (req, res) => {
  res.status(200).json(res.locals.results);
});

app.get('/api/getNutrients', foodController.getNutrients, (req, res) => {
  res.status(200).json(res.locals.results);
});

app.use((req, res) => {
  res.status(404).json('Error: Page not found.');
});

app.listen(port);
