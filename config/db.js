'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const DB = 'mongodb://localhost:27017/auth';

module.exports = () => {

    // mongoose.set('debug', true);

    let options = { server: { socketOptions: { keepAlive: 300000 } }};

    mongoose.connect(DB, options, () => {
        console.log('connect');
    }); 

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + DB);
        
    });

    mongoose.connection.once('open', () => {
        console.log('Connected to mongodb!');
    });

    mongoose.connection.on('error', function (err) {
        console.error('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};
