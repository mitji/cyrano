var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
const Users = require('./../models/User');

router.get('/like', (req, res, next) => {
  const userId = req.session.currentUser._id;    
  const {_id} = req.query;

  // get array of likes
  Quotes.findById({_id: _id})
      .then(quote => {
          let likesArr = quote.likes;
          let isInLikes = false;
          let indexOfUserId;
          likesArr.forEach((likeId, i)=> {
              if(likeId == userId) {
                  isInLikes = true;
                  indexOfUserId = i;
                  return;
              }
          });
          // dislike like
          if (isInLikes) {
              likesArr.splice(indexOfUserId,1);
          } else { // like
              likesArr.push(userId);
              //likeStatus = true;
          }
          
          // update likes
          Quotes.updateOne({_id: _id}, {likes: likesArr})
              .then(quote => {
                  console.log('likes array updated', likesArr);
                  if(isInLikes) {
                      res.status(200).send({statusText: 'dislike'})
                  } else {
                      res.status(200).send({statusText: 'like'})
                  }
              })
              .catch(err => {
                  res.status(400).send(err)

              });
              })
      .catch(err => console.log(err));
  
})

router.get('/fav', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const {_id} = req.query;
  
  Users.findById({_id: userId})
      .then(user => {
          // get array of favortie quotes
          const favsArr = user.favorites;  
          let isInFav = false;
          favsArr.forEach((favId,i) => {
              if(favId == _id) {
                  isInFav = true;
                  indexOfQuoteId = i;
                  return;
              }
          });
          // remove quote from favs 
          if (isInFav) {
              favsArr.splice(indexOfQuoteId,1);
          } else { // add to favs
              favsArr.push(_id);
          }
          
          Users.updateOne({_id: userId}, {favorites: favsArr})
              .then(quote => {                    
                  if(isInFav) {
                      res.status(200).send({statusText: 'fav'})
                  } else {
                      res.status(200).send({statusText: 'unfav'})
                  }
              })
              .catch(err => {
                  res.status(400).send(err)

              });
      })
      .catch(err => console.log(err));  
});

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
              author: {
                username: data.author.username
              },
              likes: data.likes,
              _id: data._id
            })
            return data;
          })
      }))
      .then(() => {

        // check likes and favs for user quotes
        user.quotes = user.quotes.map( quote => {
          quote.likeStatus = false;
          quote.likes.map((likeId, i)=> {
              if(likeId == userId) {
                  quote.likeStatus = true;
              }
          });
          // check if quote is in user favs
          quote.favStatus = false;
          favsToPrint.forEach(fav => {
              if(fav._id.toString() == quote._id.toString()) {
                  console.log('MATCH!!');
                  console.log('favId', fav._id);
                  console.log('quoteId', quote._id);
                  quote.favStatus = true;
                  return;
              }
          })
          return quote
        })

        // check likes and favs for fav quotes
        favsToPrint = favsToPrint.map( quote => {
          quote.likeStatus = false;
          quote.likes.map((likeId, i)=> {
              if(likeId == userId) {
                  quote.likeStatus = true;
              }
          });
          // quote is obvioulsy in favourites
          quote.favStatus = true;
          return quote
        })

        res.render('user/profile', {user, quotes: user.quotes, userFav: favsToPrint.reverse()})
      })
    })
   .catch(err => console.log(err));
  });

module.exports = router