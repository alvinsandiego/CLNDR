const {createAccount, readAccount} = require('./model/CLNDRModel');

const express = require('express');
// Import the library:
const cors = require('cors');
const app = express();
// Then use it before your routes are set up:
app.use(cors());

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log('Listening on port', port));


app.get('/test', (req, res) => {
    res.send({express: 'Test successful! This page received data from expressjs.'});
});

app.get('/test2', (req, res) => {
    readAccount("testUser1");
})

app.get('/', (req,res) => {
    res.send("Hello");
})


app.get('/EventPage', (req,res) => {
    res.send({eventName: "Event 1000", eventDate: "10/10/10"});
})

app.post('/login', (req,res) => {

})