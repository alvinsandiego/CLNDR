// initialize the database
var admin = require("firebase-admin");
var app = admin.initializeApp();

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clndr-c96b5.firebaseio.com"
});

var db = admin.firestone();

// app functions
function createEvent(title, dateStart, timeStart, dateEnd, 
                     timeEnd, description, keywords, cohosts) {
   
   
}

function updateEvent(title, dateStart, timeStart, dateEnd, 
                     timeEnd, description, keywords, cohosts) {
   
   
}

function deleteEvent(eventId){
	
}

function createAccount(username, password, securityQ, securityA) {

}

function updateAccount(username, password, securityQ, securityA) {

}

function deleteAccount(accountId) {

}

/*
planEvent and unplanEvent, for the time-being, does not have accountId yet.
Thus it is temporarily deleted as needed. Also added description and title
as needed into planEvent
*/
function planEvent(eventId, Description, Title) {
	
    //Most likely going to work like that; haven't found a use for accountId yet
    db.collection('events').doc(eventId).set({
        description: Description,
        title: Title
    })
    .then(function() {
        console.log("Event successfully planned/overwritten");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function unplanEvent(eventId) {
    //I think this is how it goes. Else, just stop at "delete();"
    db.collection('events').doc(eventId).delete().then(function() {
        console.log("Event successfully unplanned");
    })
    .catch(function(error) {
        console.log("Error removing document: ", error);
    }

}

function followHost(hostId, accountId) {

}

function unfollowHost(hostId, accountId) {

}

function getHost(hostId) {

}

function getEvent(eventId) {

}

module.exports = (createEvent, updateEvent, deleteEvent
                  createAccount, updateAccount, deleteAccount,
                  planEvent, unplanEvent, followHost, unfollowHost};
