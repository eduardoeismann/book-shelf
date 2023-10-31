const Book = require('../models/book-model')

// [ISSUE 1: OK]
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

// [ISSUE 3: OPEN]
deleteBook = async (req, res) => {
    await Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }

        return res.status(200).json({ success: true, data: book })
    }).catch(err => console.log(err))
}

// [ISSUE 4: OK]
getBookById = async (req, res) => {
    const queryId = { _id: req.params.id };

    const book = await Book.findOne(queryId);

    if(book) {
        return res.status(200).json({ success: true, data: book });
    }

    return res.status(404).json({ success: false, error: 'Book not found!' });
}

// [ISSUE 5: OPEN]
getBooks = async (req, res) => {
    await Book.find({}, (err, books) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!books.length) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }
        return res.status(200).json({ success: true, data: books })
    }).catch(err => console.log(err))
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBookById,
}
