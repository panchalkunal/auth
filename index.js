'use strict';

const express = require('express');
const passport = require('passport');
const parser = require('body-parser');
const cors = require('cors');

// General Express Stuff
const app = express();
app.use(cors());
app.use(parser.json({ limit: '50mb' }));
app.use(parser.urlencoded({ extended: false }));

// Database Stuff
require('./config/db')();

require('./db/User');
require('./db/Token');
// Passport Stuff
passport.use('jwt', require('./config/passport/jwt').strategy);
passport.use('local', require('./config/passport/local').strategy);
app.use(passport.initialize());

//Routes Stuff
app.get('/', (req, res) => { res.json({ success: true, message: "Main#index" }); });
app.use('/api', require('./router')(passport));

// DONE
app.listen(3000);
console.log(`Express app started in port ${3000}`);

