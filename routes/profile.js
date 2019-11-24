var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
const Users = require('./../models/User');

// get /profile
router.get('/', (req,res,next) => {
  const userId = req.session.currentUser._id;
  Users.findById({_id: userId})
    .then((user) => {
      console.log(user);
      Quotes.find({author: userId})
        .then((userQuotes) => {
          console.log(userQuotes);
          res.render('user/profile', {user: user, quotes: userQuotes})
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router