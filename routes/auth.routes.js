const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const User = require('../models/User.model')


// REGISTRATION: Display form
router.get("/register", (req, res, next) => {
    res.render('auth/register.hbs')
})


// REGISTRATION: Process form
router.post('/signup', (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.render("auth/register", { errorMessage: "Please provide email and password" })
        return
    }
    bcryptjs.genSalt()
        .then(salt => bcryptjs.hash(password, salt))
        .then(hash => {
            let userDetails = {
                email: email,
                passwordHash: hash
            }
            User.create(userDetails)
        })
        .then(userFromDb =>{
            res.redirect('login')
        })
        .catch(error => {
            console.log("error creating account")
            next(error)
        })
})

// LOGIN: Display form
router.get('/login', (req, res, next) => {
    res.render('auth/login')
})
// LOGIN: Display form
router.post('/login', (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.render('auth/login', { errorMessage: "Please provide email and password" })
        return
    }

    User.findOne({email})
    .then(userFromDB => {
        if(!userFromDB){
            res.render('auth/login', { errorMessage: "Wrong credentials - we have no user with that email"})
        } else if(bcryptjs.compareSync(password, userFromDB.passwordHash)){
            //login sucess
            req.session.currentUser = userFromDB
            res.render('auth/user-profile', {user: userFromDB})
        } else { 
            res.render('auth/login', { errorMessage: "Wrong password"})
        }
    })
    .catch( error => {
        console.log("error getting user details from DB", error)
    })

    // do we have it in db?
    // credentials correct ==> bcrypt.compare()

})

// PROFILE PAGE
router.get('/profile-page', (req, res, next)=>{
    console.log(req.session)

    res.render('auth/user-profile')
})

router.post('/logout', (req, res , next) => {
    req.session.destroy( err => {
        if(err){
            next(err)
        }
        res.redirect("/")
    })
})

module.exports = router