const passport = require('passport');

module.exports = function(app) {
    app.get('/planned', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                res.send({success: true, data: user.data.planned_events});
            }
        })(req, res, next);
    });
};