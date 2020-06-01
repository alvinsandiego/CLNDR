const passport = require('passport');

module.exports = function(app) {
    app.get('/following', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                res.send({success: true, data: user.data.following});
            }
        })(req, res, next);
    });
};