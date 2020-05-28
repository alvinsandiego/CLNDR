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

function planEvent(eventId, accountId) {

}

function unplanEvent(eventId, accountId) {

}

function followHost(hostId, accountId) {
	db.collection('user').doc(accountId).update({
		following: admin.firestore.FieldValue.arrayUnion(hostId)
	})
}

function unfollowHost(hostId, accountId) {
	db.collection('user').doc(accountId).update({
		following: admin.firestore.FieldValue.arrayRemove(hostId)
	})
}

function getHost(hostId) {

}

function getEvent(eventId) {

}

module.exports = (createEvent, updateEvent, deleteEvent
                  createAccount, updateAccount, deleteAccount,
                  planEvent, unplanEvent, followHost, unfollowHost};
