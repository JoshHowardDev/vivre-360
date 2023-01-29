import { Request, Response, NextFunction } from 'express';

const express = require('express');
const router = express.Router();

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  res.render('login');
});

module.exports = router;