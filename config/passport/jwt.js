'use strict';

const mongoose = require('mongoose');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = {
    expiresIn: '24h',
    algorithm: 'HS256',
    secret: "mySecret",
    issuer: "api.kunalpanchal.in",
    audience: "kunalpanchal.in"
};

const OPTIONS = {
    secretOrKey: config.secret,
    issuer: config.issuer,
    audience: config.audience,
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// new JwtStrategy(options, verify)
const jwtStrategy = new JwtStrategy(OPTIONS, (payload, next) => {
    // payload contains .user and .data
    let user = payload.user;
    return next(null, user, {});
});

module.exports = {
    strategy: jwtStrategy,
    config: config
};
