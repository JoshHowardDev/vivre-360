/* eslint-disable @typescript-eslint/dot-notation */
import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import '../auth/auth';
dotenv.config();
var router = express.Router();
router.get('/user', function (req, res) {
    // req.user is the parsed JWT containing user information
    var userId = null;
    if (req.user)
        userId = req.user['id'];
    if (userId)
        res.cookie('id', userId);
    res.status(200).json(req.user ? req.user : null);
});
// Redirects the user to google to start the authentication
router.get('/google', passport.authenticate('google'));
// Receives the authentication from google and redirects according to success or failure
router.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/auth/failure' }), function (req, res) {
    // On successful authentication
    return res.redirect('/');
});
router.get('/failure', function (request, response) {
    response.send('Authentication failed...');
});
router.get('/logout', function (req, res) {
    req.logout(function () {
        // Destroy cookie and then redirect to the home page
        req.session.destroy(function () {
            res.redirect('/');
        });
    });
});
export default router;
