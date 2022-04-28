const Book = require('../models/Book.model')
const Author= require('../models/Author.model')
const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard')
const router = require('express').Router()


router.get('/', (req, res, next) => {
    Book.find()
        .populate("author")
        .then(booksArray => {
            res.render("books/books-list.hbs", { books: booksArray })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.get("/book-create", isLoggedIn, (req, res, next) => {
    Author.find()
    // populate('author')
    .then(authorArray =>{
        console.log(authorArray)
        res.render("books/book-create", {authorArray})
        })
})

router.post('/create', (req, res, next) => {
    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating
    }
    Book.create(newBook)
        .then(() => {
            res.redirect("/books")
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})


router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId
    Book.findById(id)
        .populate("author")
        .then(bookDetails => {
            res.render("books/book-details.hbs", { book: bookDetails })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.get('/:bookId/edit', isLoggedIn, (req, res, next) => {
    const id = req.params.bookId
    Book.findById(id)
        .then(book => {
            res.render("books/book-edit.hbs", { book })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.post('/:bookId/edit', isLoggedIn, (req, res, next) => {
    const newDetails = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
    }

    const id = req.params.bookId
    Book.findByIdAndUpdate(id, newDetails)
        .then(response => {
            res.redirect(`/books/${response._id}`)
        })
        .catch(err => {
            console.log("error updating book", err)
            next(err)
        })
})

router.post("/:bookId/delete?", isLoggedIn, (req, res, next) => {
    console.log(req.params)
    const id = req.params.bookId
    console.log(id)
    Book.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/books')
        })
        .catch(err => {
            console.log("error deleting book", err)
            next(err)
        })
})

module.exports = router