const Book = require('../models/book-model')

createBook = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(402).json({
            success: false,
            error: 'You must provide a book',
        })
    }

    const book = new Book(body)

    if (!book) {
        return res.status(401).json({ success: false, error: err })
    }

    book
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: book._id,
                message: 'Book created!',
            })
        })
        .catch(error => {
            return res.status(403).json({
                error,
                message: 'Book not created!',
            })
        })
}

updateBook = async (req, res) => {
    const queryId = { _id: req.params.id };
    const updateBook = await Book.updateOne(queryId, req.body);

    if(updateBook) {
        return res.status(200).json({ success: true, data: req.body });
    }

    return res.status(404).json({ success: false, error: 'Book not found!' });
}

deleteBook = async (req, res) => {
    const queryId = await Book.findOne({ _id: req.params.id });
    const book = await Book.deleteOne(queryId);

    if(book.acknowledged) {
        return res.status(200).json({ success: true, data: book });
    }

    return res.status(404).json({ success: false, error: 'Book not found!' });
}

getBookById = async (req, res) => {
    const queryId = { _id: req.params.id };
    const book = await Book.findOne(queryId);

    if(book) {
        return res.status(200).json({ success: true, data: book });
    }

    return res.status(404).json({ success: false, error: 'Book not found!' });
}

getBooks = async (req, res) => {
    const books = await Book.find();

    if(books) {
        return res.status(200).json({ success: true, data: books });
    }

    return res.status(404).json({ success: false, error: `Book not found` });
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBookById,
}
