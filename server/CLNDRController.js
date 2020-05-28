const (createEvent, updateEvent, deleteEvent
       createAccount, updateAccount, deleteAccount,
       planEvent, unplanEvent, followHost, unfollowHost} = require('./CLNDRModel');
const express = requie('express');
const router = express.Router();

// search bar
router.get('./Page', (req,res) => {

})
// create event
router.post('./CreateEventPage', (req,res) => {

})

// update event
router.post('./EventPage', (req,res) => {

})

// delete event
router.post('./EventPage', (req,res) => {

})

// create account
router.post('./CreateAccount', (req,res) => {

})

// update account
router.post('./AccountPage', (req,res) => {

})

// delete account
router.post('./AccountPage', (req,res) => {

})

// plan event
router.post('./EventPage', (req,res) => {

})

// unplan event
router.post('./EventPage', (req,res) => {

})

// follow host
router.post('./HostPage', (req,res) => {

})

// unfollow host
router.post('./HostPage', (req,res) => {

})

// display host details
router.get('./HostPage', (req,res) => {

})

// display list of hosts
router.get('./Following', (req,res) => {

})

// display event details
router.get('./EventPage', (req,res) => {

})

// display list of events by host
router.get('./HostPage', (req,res) => {

})


// display list of planned events
router.get('./Planned', (req,res) => {

})

// check if user is verified
router.get('./CreateEventPage', (req,res) => {

})


module.exports = router;
