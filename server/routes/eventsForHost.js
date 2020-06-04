const {readEventsByHost} = require('../model/CLNDRModel');

module.exports = function(app) {
    app.post('/eventsForHost', (req, res) => {
        if (req.body.hostID === undefined) {
            res.send({success: false});
        }
        else {
            readEventsByHost(req.body.hostID).then(querySnapshot => {
                var arrayOfEvents = [];
                querySnapshot.forEach(documentSnapshot => {
                    var dataForCurrent = documentSnapshot.data();
                    delete dataForCurrent.start;
                    delete dataForCurrent.end;
                    dataForCurrent["start"] = documentSnapshot.get('start')._seconds;
                    dataForCurrent["end"] = documentSnapshot.get('end')._seconds

                    arrayOfEvents.push({id: documentSnapshot.ref.id, ...dataForCurrent});
                });

                res.send({success: true, data: arrayOfEvents});
            });
        }
    })
}