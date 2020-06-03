const Accounts = require('../model/accountsModel');
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
                const following = user.data.following;
                var result = [];
                const processData = new Promise((resolve, reject) => {
                    following.forEach((element, index, array) => {
                        Accounts.readAccountByID(element).then(documentSnapshot => {
                            console.log(element);
                            if (documentSnapshot.exists) {
                                result.push({id: element, username: documentSnapshot.get('username'), org_name: documentSnapshot.get('org_name'), contact_email: documentSnapshot.get('contact_email')});
                            }

                            if (index === array.length - 1) {
                                resolve();
                            }
                        });
                    });
                });
                processData.then(() => {
                    res.send({success: true, data: result});
                });           
            }
        })(req, res, next);
    });
};