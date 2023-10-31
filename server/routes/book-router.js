const express = require('express');

const BookController = require('../controllers/book-controller');

const router = express.Router();

router.post('/book', BookController.createBook);
router.put('/book/:id', BookController.updateBook);
router.delete('/book/:id', BookController.deleteBook);
router.get('/book/:id', BookController.getBookById);
router.get('/books', BookController.getBooks);

module.exports = router;
