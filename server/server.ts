import express, { Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
import authRouter from './routes/authRouter';
import foodController from './controllers/foodControllers';

dotenv.config();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port: number = Number(process.env.SERVER_PORT) || 1210;

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.authenticate('session'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

app.get('/api/searchFoods', foodController.searchFoods, (req: Request, res: Response) => {
  res.status(200).json(res.locals.results);
});

app.get('/api/getNutrients', foodController.getNutrients, (req: Request, res: Response) => {
  res.status(200).json(res.locals.results);
});

app.post('/api/addDish', foodController.addDish, (req: Request, res: Response) => {
  res.status(200).json(res.locals.addedDish);
});

app.get('/api/getServings', foodController.getServings, (req: Request, res: Response) => {
  res.status(200).json(res.locals.servings);
});

app.get('/api/getMyDishes', foodController.getMyDishes, (req: Request, res: Response) => {
  res.status(200).json(res.locals.dishes);
});

app.use((req: Request, res: Response) => {
  res.status(404).json('Error: Page not found.');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
