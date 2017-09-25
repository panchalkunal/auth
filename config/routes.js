const mongoose = require('mongoose');
const User = mongoose.model('User');
const Token = mongoose.model('Token');
const passport = require('passport');

module.exports = {
    signIn: async (req, res) => {
        passport.authenticate('local', { session: false }, async (err, user, info) => {
            if (err) return res.json({ success: false, err: err });
            let token = await createToken(user, {});
            return res.redirect('https://panchalkunal.github.io');
            // return res.json({ success: true, message: 'logged in', token });
        })(req, res);
    }, 
    signUp: async (req, res) => {
        try {
            let userExist = await User.findOne({ username: req.body.username });
            if (!userExist) {
                let userDb = new User();
                userDb.username = req.body.username;
                userDb.password = req.body.password;
                await userDb.save();

                let user = {
                    username: req.body.username,
                    user_id: userDb._id
                }
                let data = {
                    whoisawesome: 'iam'
                }
                let token = await createToken(user, data);
                res.json({ success: true, token });
            } else {
                res.json({ success: false, message: 'user exits with the same username' });
            }
        } catch (e) {
            console.log(e, 'error')
        }
    },
    protected: async (req, res) => {
        res.json({ sucess: true, message: 'You are in the authenticated protected route' });
    }
}

const jwt = require('jsonwebtoken');
const jwtConfig = require('./passport/jwt').config;

createToken = async (user, data) => {
    let token = jwt.sign({ user, data },
        jwtConfig.secret,
        {
            algorithm: jwtConfig.algorithm,
            expiresIn: jwtConfig.expiresIn,
            issuer: jwtConfig.issuer,
            audience: jwtConfig.audience
        }
    );
    let tokenDb = new Token();
    tokenDb.token = token;
    tokenDb.user = user.user_id;
    tokenDb.access = 'full access';
    tokenDb.client = 'gmail';

    await tokenDb.save();
    return token;
}