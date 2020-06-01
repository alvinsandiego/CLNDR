const Accounts = require('../model/accountsModel');
const VerificationRequests = require('../model/verificationRequestsModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/requestVerification', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                if (req.body.contact_email == undefined ||
                    req.body.org_name == undefined ||
                    req.body.profile_pic_url == undefined ||
                    !(req.body.contact_email.length > 0 && req.body.org_name > 0 && req.body.profile_pic_url > 0)) {
                    res.send({success: false, message: "Missing data."});
                }
                else {
                    VerificationRequests.readVerificationRequestsForUser(user.id).then(querySnapshot => {
                        if (querySnapshot.empty) {
                            VerificationRequests.createVerificationRequest(user.id, res.body.contact_email, res.body.org_name, res.body.profile_pic_url).then(docRef => {
                                res.send({success: true, message: "Verification request created."});
                            });
                        }
                        else {
                            res.send({success: false, message: "An active verification request already exists."});
                        }
                    });
                }
            }
        })(req, res, next);
    });
}