var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
const Users = require('./../models/User');


// get /profile
router.get('/', (req,res,next) => {
  const userId = req.session.currentUser._id;
  let favsToPrint = [];
  Users.findById({_id: userId})
  .populate('quotes')
  .populate('favorites')
  .then((user) => {  
    // const userData = user;
    Promise.all(
      user.favorites.map( quote => {
        return Quotes.findById({_id: quote._id})
          .populate('author')
          .then(data => {
            favsToPrint.push({
              text: data.text,
              username: data.author.username,
              likes: data.likes
            })
            //console.log('FAV UPDATE', favsToPrint)
            return data;
          })
      }))
      .then(() => {
        console.log('FAAAVS',favsToPrint);
        res.render('user/profile', {user, quotes: user.quotes, userFav: favsToPrint})
      })
    })
  // .then((user) => {
  //     console.log('FAAAVS',favs);
  //     res.render('user/profile', {user: user, quotes: user.quotes, userFav: user.favorites})
  //   })

   .catch(err => console.log(err));
  });

module.exports = router