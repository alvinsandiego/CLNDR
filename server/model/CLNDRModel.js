// initialize the database
var admin = require("firebase-admin");
var bcrypt = require("bcrypt");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

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
    const encryptPW = bcrypt.hashSync(password, 16);
    const encryptAnswer = bcrypt.hashSync(securityA, 16);
    return db.collection('users').add({
        username: username,
        password: encryptPW,
        sec_question: securityQ,
        sec_answer: encryptAnswer,
        verified: false,
        following: [],
        planned_events: []
    }).then(docRef => {
        console.log('Added doc with name: ' + docRef.id);
    });
}

function readAccount(username) {
    return db.collection('users').where('username', '==', username).get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(`Found document at ${documentSnapshot.ref.path}`);
        });
      });
}

function updateAccountUsername(uid, payload) {
    return db.collection('users').doc(uid).update({
        username: payload
    });
}

function updateAccountSecurityQuestion(uid, payload) {
    return db.collection('users').doc(uid).update({
        sec_question: payload
    });
}

function updateAccountVerifiedStatus(uid, payload) {
    return db.collection('users').doc(uid).update({
        verified: payload
    });
}

function updateAccountPassword(uid, payload) {
    const encryptPW = bcrypt.hashSync(payload, 16);
    return db.collection('users').doc(uid).update({
        password: encryptPW
    });
}

function updateAccountSecurityAnswer(uid, payload) {
    const encryptAnswer = bcrypt.hashSync(payload, 16);
    return db.collection('users').doc(uid).update({
        sec_answer: encryptAnswer
    });
}

function deleteAccount(uid) {
    return db.collection('users').doc(uid).delete();
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
	db.collection('user').doc(accountId).update({
		following: admin.firestore.FieldValue.arrayUnion(hostId)
	})
	.then(function() {
        	console.log("Successfully Followed!");
    	})
}

function unfollowHost(hostId, accountId) {
	db.collection('user').doc(accountId).update({
		following: admin.firestore.FieldValue.arrayRemove(hostId)
	})
	.then(function() {
        	console.log("Successfully Unfollowed!");
    	})
}

function getHost(hostId) {

}

function getEvent(eventId) {

}

module.exports = (createEvent, updateEvent, deleteEvent,
                  createAccount, readAccount, updateAccountUsername, updateAccountVerifiedStatus, updateAccountSecurityQuestion, updateAccountPassword, updateAccountSecurityAnswer, deleteAccount,
                  planEvent, unplanEvent, followHost, unfollowHost);
