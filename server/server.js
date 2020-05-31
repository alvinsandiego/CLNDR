const {createAccount, readAccount, createEvent, updateEvent, deleteEvent} = require('./model/CLNDRModel');

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

app.get('/test3', (req,res) => {
    res.send({express: 'Test successful! This page received data from expressjs.'});
    createEvent("testUser33", "pass123", "What is this?", "hmm",
    "testUser1", "pass123", "What is this?", "hmm");
})

/*
app.get('/test4', (req,res) => {
    updateEvent("0","Mubi123", "Hello", "Meow", "Test",
    "Run", "pass123", "Wow", "Mhmmm");
})

app.get('/test5', (req,res) => {
    deleteEvent("0");
}) */
