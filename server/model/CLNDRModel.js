const {db} = require('./firebase');

// app functions
function createEvent(title, hostingId, start,
    end, description, keywords, cohosts,imageURL,countInterest) {

    //image
	const id = db.collection('events').doc().id                  
    return db.collection('events').doc(id).set({
        eventName: title,
        hostID: hostingId,
        start: start,
        end: end,
        eventDescription: description,
        eventKeywords: keywords,
        eventCohosts: cohosts,
        imageUrl: imageURL,
        interestCount:countInterest

    });
}

// these should be numbers not strings
function readEventsForMonth(month, year) {
    const begOfMonth = new Date(year, month - 1, 1);
    const begOfNextMonth = new Date(year, month, 1);
    return db.collection('events').where('start', '>=', begOfMonth).where('start', '<', begOfNextMonth).get();
}

function readEventsByHost(hostID) {
    return db.collection('events').where('hostID', '==', hostID).get();
}

function updateEvent(eventId, title, start, end, description, keywords, cohosts, imageURL,interestCount) {
    return db.collection('events').doc(eventId).update({
        eventName: title,
        start: start,
        end: end,
        eventDescription: description,
        eventKeywords: keywords,
        eventCohosts: cohosts,
        imageUrl: imageURL
   });
}

function deleteEvent(eventId){
    //check if event exists, unless firebase does it for you already
	return db.collection('events').doc(eventId).delete();
}


function getEvent(eventId) {
    return db.collection('events').doc(eventId).get();
}

//update interest count
function incrementInterestCount(eventId,incrementedValue){
    console.log("i am in incrementModel");
    db.collection('events').doc(eventId).get().then(response=>{
        console.log(response.data());
    });
    return db.collection('events').doc(eventId).update({
        "interestCount":incrementedValue
    });
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    readEventsForMonth,
    readEventsByHost,
    getEvent, incrementInterestCount};
