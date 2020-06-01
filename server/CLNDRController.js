const {createEvent, updateEvent, deleteEvent,
       planEvent, unplanEvent, followHost, unfollowHost} = require('./model/CLNDRModel');
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

app.post('/CreateEventPage', (req,res) => {
    createEvent(req.body.title, req.body.dateStart,req.body.startTime, req.body.endDate,
        req.body.endTime,req.body.description,req.body.keywords,req.body.cohosts,req.body.image);
})

// update event
app.post('/EventPage', (req,res) => {

})

// delete event
app.post('/EventPage', (req,res) => {

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

/*-------------------------------------------------------------------*/

/*
The code assumes that eventID, description, and title is part
of the body. If this is not true, please revisit the code for the
two methods

*/

// plan event
app.post('/EventPage', (req,res) => {

    /*
    For now, I will do:
    */
    planEvent(req.body.eventId, req.body.Description, req.body.Title);
})

// unplan event
app.post('/EventPage', (req,res) => {
    /*
    For now, I will do:
    */
    unplanEvent(req.body.eventId);
})

/*-------------------------------------------------------------------*/


<<<<<<< HEAD
// follow host
<<<<<<< HEAD
//router.post('./HostPage', (req,res) => {
//	followHost(req.body.hostId, req.body.accountId);
//})

app.post('/HostPage', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            }
            else {
                followHost(req.body.hostId, user.accountId)
            }
        })(req, res, next);
    });

// unfollow host
//router.post('./HostPage', (req,res) => {
//	unfollowHost(req.body.hostId, req.body.accountId);
//})
app.post('/HostPage', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            }
            else {
                unfollowHost(req.body.hostId, user.accountId)
            }
        })(req, res, next);
    });
=======
app.post('/HostPage', (req,res) => {
	followHost(req.body.hostId, req.body.accountId);
})

// unfollow host
app.post('/HostPage', (req,res) => {
	unfollowHost(req.body.hostId, req.body.accountId);
})
>>>>>>> 8ada9c68e2f47e298036d48086495a1db6352b19

// display host details
app.get('/HostPage', (req,res) => {

})

// display list of hosts
app.get('/Following', (req,res) => {

})
=======
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
            followHost(req.body.hostId, user.id)
        }
    })(req, res, next);
});

app.post('/unfollow', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }

        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        }
        else {
            unfollowHost(req.body.hostId, user.id)
        }
    })(req, res, next);
});
>>>>>>> d50fb7e128e17bcb9dd43ec3cd6fdffba0277048

// display event details
app.get('/EventPage', (req,res) => {

})

// display list of events by host
app.get('/HostPage', (req,res) => {

})


// display list of planned events
app.get('/Planned', (req,res) => {

})

// check if user is verified
app.get('/CreateEventPage', (req,res) => {

})

module.exports = app;
