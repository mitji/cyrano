var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
//const Users = require('./../models/User');

// POST user/add

router.post('/', (req,res,next) => {
  const quoteText = req.body.quote;
  if (quoteText === '') {
    res.render('user/add', {errorMessage: 'You must write something!'});
    return;  
  }
  
  //{ "authors": { "$regex": "Alex", "$options": "i" } }

  Quotes.find({"text": { "$regex" : quoteText}})
    .populate("author")
    .then((matchQuotes) => {
     console.log("found", matchQuotes);
     
     res.render('user/search',{matchQuotes : matchQuotes});
    })
    .catch(err => console.log(err));
});


router.get('/', (req, res, next) => {
  res.render('user/search');
})

module.exports=router;