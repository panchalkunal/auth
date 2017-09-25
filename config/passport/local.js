'use strict';

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
};

const localStrategy = new LocalStrategy(LOCAL_STRATEGY_CONFIG, async (req, username, password, next) => {
    let user = await User.findOne({ username });
    if (!user) return next('wrong username', null, {});
    if (!isPasswordValid(user.password, password)) { return next('wrong password', null, {}); }
    return next(null, user, {});
});

function isPasswordValid(dbPassword, password) {
    return dbPassword === password;
}
module.exports = {
    strategy: localStrategy
};
