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

function planEvent(eventId, accountId) {

}

function unplanEvent(eventId, accountId) {

}

function followHost(hostId, accountId) {

}

function unfollowHost(hostId, accountId) {

}

function getHost(hostId) {

}

function getEvent(eventId) {

}

module.exports = {createEvent, updateEvent, deleteEvent,
                  createAccount, readAccount, updateAccountUsername, updateAccountVerifiedStatus, updateAccountSecurityQuestion, updateAccountPassword, updateAccountSecurityAnswer, deleteAccount,
                  planEvent, unplanEvent, followHost, unfollowHost};
