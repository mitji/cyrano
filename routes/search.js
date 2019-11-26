var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
//const Users = require('./../models/User');

// POST user/add

router.post('/', (req,res,next) => {
  const quoteText = req.body.quote;
  if (quoteText === '') {
    res.render('user/search', {errorMessage: 'You must write something!'});
    return;  
  }
  
  //{ "authors": { "$regex": "Alex", "$options": "i" } }

  Quotes.find({"text": { "$regex" : quoteText}})
    .populate("author")
    .then((matchQuotes) => {
      console.log("found", matchQuotes);
      if (matchQuotes.length != 0) {
        res.render('user/search',{matchQuotes : matchQuotes});
      } else {
        res.render('user/search',{errorMessage : `No quotes found for '${quoteText}' !`});
      }
    })
    .catch(err => console.log(err));
});


router.get('/', (req, res, next) => {
  res.render('user/search');
})

module.exports=router;