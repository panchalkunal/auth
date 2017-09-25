const router = require('express').Router();
// s.Router();



module.exports = (passport) => {

    const routesController = require('./config/routes');

    router.post('/signin', [routesController.signIn]);
    router.post('/signUp', [routesController.signUp]);
    router.post('/protected', [

        (req, res, next) => {
            console.log('1inside Authenticate');
            passport.authenticate('jwt', function (error, user, info) {
                console.log('inside Authenticate',user);
                if (error) return res.status(500).json({ success: false, error: 'jwt failed' });
                if (!user) return res.status(401).json({ success: false, error: '!user error' });
                req.user = user;
                next();
            })(req, res);
        },
        routesController.protected]);
    return router;
}

