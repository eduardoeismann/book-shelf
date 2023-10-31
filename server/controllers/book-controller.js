const Book = require('../models/book-model')

createBook = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a book',
        })
    }

    const book = new Book(body)

    if (!book) {
        return res.status(400).json({ success: false, error: err })
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
            return res.status(400).json({
                error,
                message: 'Book not created!',
            })
        })
}

// [ISSUE 2: OPEN]
updateBook = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Book not found!',
            });
        }
        book.name = body.name;
        book.time = body.time;
        book.rating = body.rating;
        book.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: book._id,
                    message: 'Book updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Book not updated!',
                });
            });
    });
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

    console.log('-- BOOKS --');
    console.log(books);

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
