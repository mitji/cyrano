var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');

router.get('/', (req,res,next) => {
    Quotes.find()
        .populate('author')
        .then((quotes) => {
            res.render('user/home', {quotesList : quotes});
        })
        .catch(err  => console.log(err));
});

module.exports = router;