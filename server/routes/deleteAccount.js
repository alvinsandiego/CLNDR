const Accounts = require('../model/accountsModel');
const passport = require('passport');

module.exports = function(app) {
    app.get('/deleteAccount', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            try {
                Accounts.deleteAccount(user.id).then(result => {
                    res.status(200).send("Account deletion processed.");
                });
            }
            catch (err) {
                res.send("Account deletion error.");
            }
        })(req, res, next);
    });
};