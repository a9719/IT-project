const express = require('express');
const router = express.Router();
const url = 'http://localhost:3000/';

const passport = require('passport');
const config = require('../../config/passport');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect(url);
    } else {
        next();
    }
};

router.get(
    '/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));
  
router.get(
    '/google/callback',
    passport.authenticate('google', {failureRedirect: url + 'profile', session: true}),
    function (req, res) {
        res.redirect(url);
});

router.get(
    '/logout', 
    (req, res) => {
        req.logout();
        res.redirect(url);
});

router.get(
    '/google/redirect', 
    passport.authenticate('google'), 
    (req, res) => {
        //keep user cookies
        req.session.token = req.user.token;
        res.redirect(url);
});

router.get('/checklogin', authCheck, (req, res) => {
    res.send(req.user);
});

module.exports = router;