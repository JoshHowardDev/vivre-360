import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
import authRouter from './routes/authRouter';
import foodController from './controllers/foodControllers';
dotenv.config();
var __dirname = url.fileURLToPath(new URL('.', import.meta.url));
var app = express();
var port = Number(process.env.SERVER_PORT) || 1210;
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.authenticate('session'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use('/static', express.static(path.resolve(__dirname, './static')));
// Routers
app.use('/auth', authRouter);
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});
// app.get('/', (req: Request, res: Response) => {
//   res.redirect('http://localhost:1209');
// });
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
app.get('/api/searchFoods', foodController.searchFoods, function (req, res) {
    res.status(200).json(res.locals.results);
});
app.get('/api/getNutrients', foodController.getNutrients, function (req, res) {
    res.status(200).json(res.locals.results);
});
app.post('/api/addDish', foodController.addDish, function (req, res) {
    res.status(200).json(res.locals.addedDish);
});
app.get('/api/getServings', foodController.getServings, function (req, res) {
    res.status(200).json(res.locals.servings);
});
app.get('/api/getMyDishes', foodController.getMyDishes, function (req, res) {
    res.status(200).json(res.locals.dishes);
});
app.use(function (req, res) {
    res.status(404).json('Error: Page not found.');
});
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
