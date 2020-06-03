const {db} = require('./firebase');

// app functions
function createEvent(title, hostingId, start,
    end, description, keywords, cohosts,imageURL) {

    //image
	const id = db.collection('events').doc().id                  
    return db.collection('events').doc(id).set({
        sortId:  "placeholder",
        eventId: id,
        eventName: title,
        hostID: hostingId,
        start: start,
        end: end,
        eventDescription: description,
        eventKeywords: keywords,
        eventCohots: cohosts,
        imageUrl: imageURL
    });
}

// these should be numbers not strings
function readEventsForMonth(month, year) {
    const begOfMonth = new Date(year, month - 1, 1);
    const begOfNextMonth = new Date(year, month, 1);
    return db.collection('events').where('start', '>=', begOfMonth).where('start', '<', begOfNextMonth).get();
}

function updateEvent(eventId, title, start, end, description, keywords, cohosts, imageURL) {
    return db.collection('events').doc(eventId).update({
        eventName: title,
        start: start,
        end: end,
        eventDescription: description,
        eventKeywords: keywords,
        eventCohots: cohosts,
        imageUrl: imageURL
   });
}

function deleteEvent(eventId){
    //check if event exists, unless firebase does it for you already
	return db.collection('events').doc(eventId).delete();
}


function getHost(hostId) {

}

function getEvent(eventId) {
    return db.collection('events').doc(eventId).get();
}

module.exports = {createEvent, updateEvent, deleteEvent, readEventsForMonth,
                  getEvent};
