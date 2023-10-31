const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1/shelf', { useNewUrlParser: true })
    .catch(err => {
        console.error('Connection error: ', err.message);
    });

const db = mongoose.connection;

module.exports = db;

