var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
const Users = require('./../models/User');


// get /profile
router.get('/', (req,res,next) => {
  const userId = req.session.currentUser._id;
  let favs = [];
  Users.findById({_id: userId})
  .populate('quotes')
  .populate('favorites')
  // .then((user) => {      
  //   let pr1 = Promise.resolve(
  //     user.favorites.forEach( quote => {
  //       Quotes.findById({_id: quote._id})
  //         .populate('author')
  //         .then(data => {
  //           favs.push({
  //             text: data.text,
  //             username: data.author.username,
  //             likes: data.likes
  //           })
  //           console.log('FAV UPDATE', favs)
  //           return favs
  //         })
  //     }))
  //     pr1.then((user)=>{
  //       console.log('FAAAVS',favs);
  //       res.render('user/profile', {user: user, quotes: user.quotes, userFav: favs})
  //     })
  //   })
  .then((user) => {
      console.log('FAAAVS',favs);
      res.render('user/profile', {user: user, quotes: user.quotes, userFav: user.favorites})
    })

   .catch(err => console.log(err));
  });

module.exports = router