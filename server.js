const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log('Listening on port', port));

app.get('/test', (req, res) => {
    res.send({express: 'Test successful! This page received data from expressjs.'});
});