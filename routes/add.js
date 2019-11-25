var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
const Users = require('./../models/User');

// POST user/add
router.post('/', (req,res,next) => {
  const quoteText = req.body.quote;
  if (quoteText === '') {
    res.render('user/add', {errorMessage: 'You must write something!'});
    return;  
  }
  const userId = req.session.currentUser._id;
  Quotes.create({text: quoteText, author: userId})
    .then((quote) => {
      Users.findById(userId)
        .then(user => {
          user.quotes.push(quote);
          console.log(user.quotes);
          Users.updateOne({_id: userId}, {quotes: user.quotes})
            .then( () => {
              // REDIRECT TO USER PROFILE
              res.redirect('profile');
            })
            .catch(err => console.log(err));
        })
    })
});


router.get('/', (req, res, next) => {
  res.render('user/add');
})

module.exports=router;