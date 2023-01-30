import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oidc';
import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// This configures the GoogleStrategy to fetch the user record associated with the Google account. 
// If a user record does not exist, one is created the first time someone signs in. In either case, the user is authenticated.
passport.use(new GoogleStrategy({
  // clientID: process.env['GOOGLE_CLIENT_ID'],
  // clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  clientID: '254826930640-6jcg3cnbvb5rl9tsh8hij62pnrta9rme.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/oauth2/redirect/google',
  scope: ['profile']
}, function verify(issuer: any, profile: any, cb: any) {
  console.log('issuer ', issuer);
  console.log('profile ', profile);
  console.log('cb ', cb)
}));

// Redirects the user to google to start the authentication
router.get('/google', passport.authenticate('google'));

// Receives the authentication from google and redirects according to success or failure
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

type PassportUser = {
  id: string,
  username: string,
  name: string
}

passport.serializeUser(function (user: PassportUser, cb) {
  process.nextTick(function () {
    console.log(user);
    // cb(null, { id: user.id, username: user.username, name: user.name });
    cb(null, user);
  });
});

passport.deserializeUser(function (user: PassportUser, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default router;