const {createEvent, updateEvent, deleteEvent,
       planEvent, unplanEvent, followHost, unfollowHost, getEvent, incrementInterestCount} = require('./model/CLNDRModel');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');


const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log('Listening on port', port));

require('./auth/passport');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());


// search bar
app.get('/Page', (req,res) => {

})
// create event

app.post('/CreateEventPage', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.send({success: false, message: info.message});
        }
        else {
            if (user.data.verified) {
                const start = new Date(req.body.startDate + 'T' + req.body.startTime);
                const end = new Date (req.body.endDate + 'T' + req.body.endTime);
                if (end < start) {
                    res.send({success: false, message: "End date/time cannot be before start date/time."});
                }
                else {
                    createEvent(req.body.title, req.body.hostID, start, end, req.body.description, req.body.keywords, req.body.cohosts, req.body.imageUrl,req.body.interestCount).then(result => {
                        res.send({success: true, message: "Created event."});
                    });
                }
            }
            else {
                res.send({success: false, message: "User not verified."});
            }
        }
    })(req, res, next);
})

// update event
app.post('/updateEvent', (req, res, next) => {
    
    console.log(req.body);
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            console.log("checking 1 2 3 in updateEvent");
            res.send({success: false, message: info.message});
        }
        else {
            if (user.data.verified) {
                getEvent(req.body.eventId).then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        if (user.id === documentSnapshot.get("hostID")) {
                            const start = new Date(req.body.startDate + 'T' + req.body.startTime);
                            const end = new Date (req.body.endDate + 'T' + req.body.endTime);

                            if (end < start) {
                                res.send({success: false, message: "End date/time cannot be before start date/time."});
                            }
                            else {
                                updateEvent(req.body.title, start, end, req.body.description, req.body.keywords, req.body.cohosts, req.body.imageUrl).then(result => {
                                    res.send({success: true, message: "Updated event."});
                                });                                
                            }
                        }
                        else {
                            res.send({success: false, message: "User is not owner of event."});
                        }
                    }
                    else {
                        res.send({success: false, message: "Event not found."});
                    }
                });
            }
            else {
                res.send({success: false, message: "User not verified."});
            }
        }
    })(req, res, next);
})

// delete event
app.post('/deleteEvent', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.send({success: false, message: info.message});
        }
        else {
            if (user.data.verified) {
                getEvent(req.body.eventId).then(documentSnapshot => {
                    if (documentSnapshot.exists){
                        if (user.id === documentSnapshot.get("hostID")) {
                            deleteEvent(req.body.eventId).then(result => {
                                res.send({success: true, message: "Deleted event."});
                            });
                        }
                        else {
                            res.send({success: false, message: "User is not owner of event."});
                        }
                    }
                    else {
                        res.send({success: false, message: "Event not found."});
                    }
                });
            }
            else {
                res.send({success: false, message: "User not verified."});
            }
        }
    })(req, res, next);
})

// display event details
app.get('/getEvent', (req, res) => {
    if (req.query.eventId != undefined) {
        getEvent(req.query.eventId).then(documentSnapshot => {
            if (documentSnapshot.exists) {
                res.send({success: true, id: documentSnapshot.ref.id, data: documentSnapshot.data()});
            }
            else {
                res.setDefaultEncoding({success: false, message: "Event not found."});
            }
        });
    }
    else {
        res.send({success: false, message: "Field eventId is undefined"});
    }
})


//display interest counts
app.post('/incrementInterest', (req, res, next) => {
    console.log("check INterests count bitchhh");
    console.log(req.body.interestCount);
    if (req.body.eventId != undefined) {
        incrementInterestCount(req.body.eventId, req.body.interestCount).then(result => {
            res.send({success: true, message: "Updated Increment"});
        });
    }
    else {
        res.send({success: false, message: "Field eventId is undefined"});
    } 
})

// log in
require('./routes/login')(app);

// log out

// create account
require('./routes/register')(app);

// update account
require('./routes/updateAccount')(app);

// delete account
require('./routes/deleteAccount')(app);

// user info
require('./routes/userInfo')(app);

// account info
require('./routes/accountInfo')(app);

// following
require('./routes/following')(app);

// planned
require('./routes/planned')(app);

// request verification
require('./routes/requestVerification')(app);

// status check
require('./routes/verificationApplicationStatus')(app);

// events for month
require('./routes/eventsForMonth')(app);

// plan event
require('./routes/planEvent')(app);

// unplan event
require('./routes/unplanEvent')(app);

// follow
require('./routes/follow')(app);

// unfollow
require('./routes/unfollow')(app);

// display list of events by host
require('./routes/eventsForHost')(app);

// forgot password
require('./routes/forgotPassword')(app);

module.exports = app;
