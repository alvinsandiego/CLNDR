const jwtConfig = require('../auth/jwtConfig');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/login', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(err);
            }
    
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            }
            else {
                req.logIn(user, err => {
                    const token = jwt.sign({id: user.id}, jwtConfig.secret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        message: "Log in successful"
                    });
                });
            }
        })(req, res, next);
    });
};