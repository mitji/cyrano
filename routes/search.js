var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
const Users = require('./../models/User');

let likeStatus = false;

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
                        res.status(200).send({statusText: 'remove from fav'})
                    } else {
                        res.status(200).send({statusText: 'add to fav'})
                    }
                })
                .catch(err => {
                    res.status(400).send(err)

                });
                })
        .catch(err => console.log(err));  
  });

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
        // check likes
        const userId = req.session.currentUser._id;
        console.log('matchQuotes', matchQuotes);
        
        matchQuotes = matchQuotes.map( quote => {
            quote.likeStatus = false;
            quote.likes.map( likeId => {
                if(likeId == userId) {
                    quote.likeStatus = true;
                }
            });
            return quote;
        });
        console.log('after matchQuotes', matchQuotes.likes);
        
        res.render('user/search',{matchQuotes : matchQuotes});
      } else {
        res.render('user/search',{errorMessage : `No quotes found for '${quoteText}' !`});
      }
    })
    .catch(err => console.log(err));
});

// router.get('/', (req,res,next) => {
//   Quotes.find()
//       .populate('author')
//       .then((quotes) => {
//           // sort quotes
//           const userId = req.session.currentUser._id;
//           quotes = quotes.map( quote => {
//               quote.likeStatus = false;
//               quote.likes.map( likeId => {
//                   if(likeId == userId) {
//                       quote.likeStatus = true;
//                       return;
//                   }
//               });
//               return quote;
//           }).sort( (a,b) => {
//             return b.likes.length - a.likes.length;
//           })
//           // select only top 15
//           top15Quotes = quotes.slice(0,15)
//           res.render('user/home', {quotesList : top15Quotes, title: 'Top 15 quotes'});
//       })
//       .catch(err  => console.log(err));
// });

router.get('/', (req, res, next) => {
  res.render('user/search');
})

module.exports=router;