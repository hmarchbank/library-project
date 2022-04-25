const Book = require('../models/Book.model')
const router = require('express').Router()


router.get('/books', (req, res, next) => {
    Book.find()
    .then(booksArray => {
        res.render("books/books-list.hbs", {books: booksArray})
    })
    .catch( err => {
        console.log(err)
        next(err)
    })
})

router.get("/books/book-create", (req, res, next) => {
    res.render("books/book-create")
})

router.post('/books/create', (req, res, next) => {
    const newBook = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating
}
    Book.create(newBook)
    .then( () =>{
        res.redirect("/books")
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
})

router.get('/books/:bookId', (req, res, next) => {
    const id = req.params.bookId
    console.log(id)
    Book.findById(id)
    .then( bookDetails =>{
        res.render("books/book-details.hbs", {book: bookDetails})
        console.log(bookDetails)
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
})



module.exports = router