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

router.get('/books/:bookId/edit', (req, res, next) => {
    const id = req.params.bookId
    Book.findById(id)
    .then(book => {
        res.render("books/book-edit.hbs", {book})
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
})

router.post('/books/:bookId/edit', (req, res, next) => {
    const newDetails = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
    }

    const id = req.params.bookId
    console.log(req.params)
    Book.findByIdAndUpdate(id, newDetails)
    .then(response => {
        res.redirect(`/books/${response._id}`)
    })
    .catch(err => {
        console.log("error updating book", err)
        next(err)
    })
})

router.post("/books/:bookId/delete", (req, res, next) => {
    console.log(req.params)
    const id = req.params.bookdId
    Book.findByIdAndRemove(id)
    .then( res => {
        res.redirect('/books')
    })
    .catch( err => {
        console.log("error deleting book",err)
        next(err)
    })
})



module.exports = router