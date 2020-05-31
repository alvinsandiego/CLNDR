const bcrypt = require("bcrypt");
const {db} = require('./firebase');

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
    });
}

function createAccountMinimal(username, password) {
    return createAccount(username, password, "", "");
}

function readAccountByUsername(username) {
    return db.collection('users').where('username', '==', username).limit(1).get();
}

function readAccountByID(uid) {
    return db.collection('users').doc(uid).get();
}

function updateAccount(uid, payload) {
    var updateBody = {}
    if (payload.username != undefined) {
        updateBody.username = payload.username;
    }
    if (payload.password != undefined) {
        const encryptPW = bcrypt.hashSync(payload.password, 16);
        updateBody.password = encryptPW;
    }
    if (payload.sec_question != undefined) {
        updateBody.sec_question = payload.sec_question;
    }
    if (payload.sec_answer != undefined) {
        const encryptAnswer = bcrypt.hashSync(payload.sec_answer, 16);
        updateBody.sec_answer = encryptAnswer;
    }
    
    return db.collection('users').doc(uid).update(updateBody);
}

function updateAccountVerifiedStatus(uid, payload) {
    return db.collection('users').doc(uid).update({
        verified: payload
    });
}

function deleteAccount(uid) {
    return db.collection('users').doc(uid).delete();
}

module.exports = {createAccount, createAccountMinimal, readAccountByUsername, readAccountByID, updateAccount, updateAccountVerifiedStatus, deleteAccount};