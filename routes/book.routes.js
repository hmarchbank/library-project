const Book = require('../models/Book.model')
const router = require('express').Router()


router.get('/books', (req, res, next) => {
    Book.find()
    .then(booksArray => {
        // console.log(booksArray)
        console.log(booksArray[0].title)
        // res.send('great news, your query worked')
        res.render("books/books-list.hbs", {books: booksArray})
    })
    .catch( err => {
        console.log(err)
        next(err)
    })
})

module.exports = router