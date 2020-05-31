const passport = require('passport');

module.exports = function(app) {
    app.post('/register', (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.log(err);
            }
    
            if (info != undefined) {
                console.log(info.message);
                res.send({message: info.message, success: false});
            }
            else {
                req.logIn(user, err => {
                    res.status(200).send({message: 'User created successfully.', success: true});
                });
            }
        })(req, res, next);
    });
};