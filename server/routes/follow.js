const Accounts = require('../model/accountsModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/follow', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
    
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            }
            else {
                Accounts.followHost(req.body.hostId, user.id);
            }
        })(req, res, next);
    });
}