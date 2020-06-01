const Accounts = require('../model/accountsModel');

module.exports = function(app) {
    app.get("/userInfo", (req, res) => {
        if (req.body.userID != undefined) {
            Accounts.readAccountByID(req.body.userID).then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    var data = documentSnapshot.data()
                    delete data.password;
                    delete data.sec_answer;
                    res.status(200).send({success: true, id: documentSnapshot.ref.id, data: data});
                }
                else {
                    res.status(200).send({success: false, message: "User not found."});
                }
            });
        }
        else if (req.body.username != undefined) {
            Accounts.readAccountByUsername(req.body.username).then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const firstUser = querySnapshot.docs[0];
                    var userData = firstUser.data();
                    delete userData.password;
                    delete userData.sec_answer;
                    res.status(200).send({success: true, id: firstUser.ref.id, data: userData});
                }
                else {
                    res.status(200).send({success: false, message: "User not found."});
                }
            });
        }
        else {
            res.status(200).send({success: false, message: "Invalid request."});
        }
    });
}