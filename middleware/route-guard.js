


const isLoggedIn = (req, res, next) => {
    if(req.session.currentUser){
        next()
    } else {
        res.render("auth/login.hbs", {errorMessage: "You need to login to view this page"})
    }
}

// const isLoggedOut = (req, res , next) => {
//     if(req.session.currentUser){
//         return res.redirect('/')
//     }
// }

module.exports = {
    isLoggedIn
}