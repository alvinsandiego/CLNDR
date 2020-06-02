const Accounts = require('../model/accountsModel');
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
                const planned = user.data.planned_events;
                var result = [];
                const processData = new Promise((resolve, reject) => {
                    planned.forEach((element, index, array) => {
                        Accounts.readAccountByID(element).then(documentSnapshot => {
                            console.log(element);
                            if (documentSnapshot.exists) {
                                Accounts.readAccountByID(documentSnapshot.get('hostID')).then(hostSnapshot => {
                                    if (hostSnapshot.exists) {
                                        result.push({id: element, name: documentSnapshot.get('eventName'), hostName: hostSnapshot.get('org_name'), description: documentSnapshot.get('eventDescription'), start: documentSnapshot.get('start'), end: documentSnapshot.get('end')});
                                    }
                                })
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