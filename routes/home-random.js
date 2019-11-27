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

router.get('/', (req,res,next) => {
    Quotes.find()
        .populate('author')
        .then((quotes) => {
            
            // // check likes of every quote
            // const userId = req.session.currentUser._id;
            // quotes = quotes.map( quote => {
            //     quote.likeStatus = false;
            //     quote.likes.map( likeId => {
            //         if(likeId == userId) {
            //             quote.likeStatus = true;
            //             return;
            //         }
            //     });
            //     return quotes;
            // });

            // generate random indexes up to a maximum of 10
            let randIndexArr = [0];
            for(let i=0;( i<quotes.length && i<15 );i++) {
              let newRand = Math.floor(Math.random() * quotes.length);
              if (!randIndexArr.includes(newRand)) {
                randIndexArr[i] = newRand;
              } else {
                i = i-1;
              }
            }
            
            // select random quotes
            let randQuotes = []; 
            randIndexArr.forEach( (el,i) => {
              randQuotes[i] = quotes[el];              
            })
            
            res.render('user/home', {quotesList : randQuotes, title: 'Random quotes'});
        })
        .catch(err  => console.log(err));
});

module.exports = router;