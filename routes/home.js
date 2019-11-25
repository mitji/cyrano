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
            const likesArr = quote.likes;
            let isInLikes = false;
            likesArr.forEach(likeId => {
                console.log('likeId:', typeof likeId);
                console.log('userId', typeof userId);
                if(likeId == userId) {
                    isInLikes = true;
                    return;
                }
            });
            // update like
            if (isInLikes) {
                console.log("You've already given like to this quote!");
                //res.status(200).send()
                return;
            }
            console.log('-----New like!'); 
            console.log('- initial likes', quote.likes);
            likesArr.push(userId);
            console.log('- updated likes',likesArr); 
            console.log('isInLikes',isInLikes);
            
            Quotes.updateOne({_id: _id}, {likes: likesArr})
                .then(quote => {
                    console.log('likes update');
                    //res.redirect('/home');
                    //console.log(quote.likes.length);
                    
                    res.status(200).send()
                })
                .catch(err => {
                    res.status(400).send(err)

                });
                })
        .catch(err => console.log(err));
    
})

router.post('/fav', (req, res, next) => {
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
                res.redirect('/home');
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
                    res.redirect('/home');
                })
                .catch(err => console.log(err));
                })
        .catch(err => console.log(err));  
  })

router.get('/', (req,res,next) => {
    Quotes.find()
        .populate('author')
        .then((quotes) => {
            res.render('user/home', {quotesList : quotes});
        })
        .catch(err  => console.log(err));
});

module.exports = router;