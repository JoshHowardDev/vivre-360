import passport from 'passport';
import Strategy from 'passport-google-oauth2';
import dotenv from 'dotenv';
import userController from '../controllers/userController';

dotenv.config();

const getOrAddUser = async (req, accessToken, refreshToken, profile, done) => {
  // Destructure relevant profile details to set on passport user JWT
  const {
    email, display_name, family_name, given_name, picture,
  } = profile;
  const passportUser: PassportUser = {
    email, display_name, family_name, given_name, picture,
  };

  // If user is in the database, set user ID accordingly
  const userInfo = await userController.getUser(null, profile.id);
  if (userInfo) {
    passportUser._id = userInfo._id;
    // If user is not in the database, add user and set ID
  } else {
    const userId = await userController.addUser(profile);
    passportUser._id = userId;
  }

  return done(null, passportUser);
};

const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    passReqToCallback: true,
    scope: ['profile', 'email'],
  },
  getOrAddUser,
);

passport.use(googleStrategy);

type PassportUser = {
  _id?: string,
  email?: string,
  display_name?: string,
  family_name?: string,
  given_name?: string,
  picture?: string
};

type PassportUserJWT = {
  id?: string,
  username?: string,
  displayName?: string,
  picture?: string
};

passport.serializeUser((user: PassportUser, done) => {
  const userJWT: PassportUserJWT = {};
  if (user.picture) userJWT.picture = user.picture;
  userJWT.id = user._id;
  // If user has a display on their google account, set display name accordingly
  if (user.display_name) {
    userJWT.displayName = user.display_name;
    // If user has either given or family name on their google account, set display name accordingly
  } else if (user.family_name || user.given_name) {
    if (user.given_name && user.family_name) userJWT.displayName = `${user.given_name} ${user.family_name}`;
    if (user.given_name) userJWT.displayName = user.given_name;
    if (user.family_name) userJWT.displayName += ` ${user.family_name}`;
    // If user has neither display name, family name, nor given name on their google account,
    // set display name to their scraped email username
  } else {
    userJWT.displayName = user.email.replace('@gmail.com', '');
  }
  done(null, userJWT);
});

passport.deserializeUser((user: PassportUser, done) => {
  done(null, user);
});
