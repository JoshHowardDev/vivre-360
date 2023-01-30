/* eslint-disable @typescript-eslint/dot-notation */
import express, { Request, Response } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import '../auth/auth';

dotenv.config();

const router = express.Router();

router.get('/user', (req, res) => {
  // req.user is the parsed JWT containing user information
  let userId = null;
  if (req.user) userId = req.user['id'];
  if (userId) res.cookie('id', userId);
  res.status(200).json(req.user ? req.user : null);
});

// Redirects the user to google to start the authentication
router.get('/google', passport.authenticate('google'));

// Receives the authentication from google and redirects according to success or failure
router.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/auth/failure' }), (req: Request, res: Response) => {
  // On successful authentication
  return res.redirect('/');
});

router.get('/failure', (request, response) => {
  response.send('Authentication failed...');
});

router.get('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    // Destroy cookie and then redirect to the home page
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

export default router;
