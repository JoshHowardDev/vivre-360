import express from 'express';
import path from 'path';
import foodController from './controllers/foodControllers.js';

const app = express();
const port = 3000;

app.use(express.json());

// app.use(express.static('assets'));
app.use('/assets', (req, res) => {
  const filePath = path.resolve(__dirname, `assets/${req.url}`);
  res.status(200).sendFile(filePath);
});

app.get('/', (req, res) => {
  res.send('Express main page');
});

app.get('/api/searchFoods', foodController.searchFoods, (req, res) => {
  res.status(200).json(res.locals.results);
});

app.get('/api/getNutrients', foodController.getNutrients, (req, res) => {
  res.status(200).json(res.locals.results);
});

app.post('/api/addDish', foodController.addDish, (req, res) => {
  res.status(200).json(res.locals.addedDish);
});

app.get('/api/getServings', foodController.getServings, (req, res) => {
  res.status(200).json(res.locals.servings);
});

app.get('/api/getMyDishes', foodController.getMyDishes, (req, res) => {
  res.status(200).json(res.locals.dishes);
});

app.use((req, res) => {
  res.status(404).json('Error: Page not found.');
});

app.listen(port);
