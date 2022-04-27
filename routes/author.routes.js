const Author= require('../models/Author.model')
const router = require('express').Router()

router.get("/", (req, res, next) =>{
    Author.find()
        .then(authorsArray  =>{
            res.render('authors/author-list.hbs', {authors: authorsArray})
        })
        .catch( err => {
            console.log(err)
            next(err)
        })
})

router.get('/author-create', (req, res, next) =>{
    res.render('authors/author-create')
})

router.post('/create', (req, res, next) => {
    const newAuthor = {
        name: req.body.name,
        favouriteFood: req.body.favouriteFood,
        country: req.body.country,
    }
    Author.create(newAuthor)
        .then(() => {
            res.redirect("/authors")
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.get('/:authorId/edit', (req, res, next) => {
    const id = req.params.authorId
    Author.findById(id)
        .then(author => {
            res.render("authors/author-edit.hbs", { author })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.post('/:authorId/edit', (req, res, next) => {
    const newDetails = {
        name: req.body.name,
        favouriteFood: req.body.favouriteFood,
        country: req.body.country,
    }

    const id = req.params.authorId
    Author.findByIdAndUpdate(id, newDetails)
        .then(response => {
            res.redirect(`/a`)
        })
        .catch(err => {
            console.log("error updating book", err)
            next(err)
        })
})

module.exports = router