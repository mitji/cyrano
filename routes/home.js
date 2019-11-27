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
            console.log(favsArr);    
            let isInFav = false;
            favsArr.forEach(favId => {
                console.log('favId:', favId);
                console.log('quoteId',  _id);
                if(favId == _id) {
                    isInFav = true;
                    return;
                }
            });
            // update like
            if (isInFav) {
                console.log("You've already added to favorites!");
                res.status(200).send();
                return;
            }
            console.log('-----New fav!'); 
            console.log('- initial favs', user.favorites);
            favsArr.push(_id);
            console.log('- updated favs',favsArr); 
            console.log('isInFav',isInFav);
            
            Users.updateOne({_id: userId}, {favorites: favsArr})
                .then(quote => {                    
                    console.log('favorites update');
                    res.status(200).send();
                })
                .catch(err => {
                    res.status(400).send(err)

                });
                })
        .catch(err => console.log(err));  
  })

router.get('/', (req,res,next) => {
    Quotes.find()
        .populate('author')
        .then((quotes) => {
            quotes = quotes.reverse();
            res.render('user/home', {quotesList : quotes, title: 'All quotes'});
        })
        .catch(err  => console.log(err));
});

module.exports = router;