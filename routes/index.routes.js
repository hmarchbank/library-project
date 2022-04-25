const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.get('/artists/madonna', (re, res, next ) => {
  res.send("this page is for madonna")
})

module.exports = router;
