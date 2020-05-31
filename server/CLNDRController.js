const {createEvent, updateEvent, deleteEvent,
       planEvent, unplanEvent, followHost, unfollowHost} = require('./model/CLNDRModel');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');


const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log('Listening on port', port));

require('./auth/passport');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());


// search bar
app.get('/Page', (req,res) => {

})
// create event

app.post('/CreateEventPage', (req,res) => {
    createEvent(req.body.title, req.body.dateStart,req.body.startTime, req.body.endDate,
        req.body.endTime,req.body.description,req.body.keywords,req.body.cohosts);
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


// follow host
app.post('/HostPage', (req,res) => {
	followHost(req.body.hostId, req.body.accountId);
})

// unfollow host
app.post('/HostPage', (req,res) => {
	unfollowHost(req.body.hostId, req.body.accountId);
})

// display host details
app.get('/HostPage', (req,res) => {

})

// display list of hosts
app.get('/Following', (req,res) => {

})

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
