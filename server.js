const express = require('express');
const mongoose = require('mongoose');

//Create express instance
const app = express();

//Assign port from process environment or defuault to port 3001
const PORT = process.env.PORT || 3001;

//Add middleware for parsing body from requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Create mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/portfolioDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongoose connected successfully.');
})

connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
})

app.get("/api/config", (req, res) => {
    res.send('This is a test route.');
})

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
})