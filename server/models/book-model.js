const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: false },
        pages: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('books', Book);

