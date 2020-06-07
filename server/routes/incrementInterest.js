const {incrementInterestCount} = require('../model/CLNDRModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/incrementInterest', (req, res, next) => {
        if (req.body.eventId != undefined) {
            incrementInterestCount(req.body.eventId, req.body.interestCount).then(result => {
                res.send({success: true, message: "Updated Increment"});
            });
        }
        else {
            res.send({success: false, message: "Field eventId is undefined"});
        } 
    })
}