var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');

router.post('/like', (req, res, next) => {
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
                res.redirect('/home');
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
                    res.redirect('/home');
                })
                .catch(err => console.log(err));
                })
        .catch(err => console.log(err));

    // Quotes.findById({_id: _id}).where('likes').elemMatch({$ne: userId})
    //     .then(quote => {
    //         console.log('initial likes', quote.likes);
    //         const likesArr = quote.likes;
    //         likesArr.push(userId);
    //         console.log('updated likes',likesArr);
    //         // update like
    //         //const isInLikes = false;
    //         console.log({_id});
            
    //         let isInLikes = quote.likes.find( () => element === {_id});
    //         console.log('isInLikes',isInLikes);
            
    //         Quotes.updateOne({_id: _id}, {likes: likesArr})
    //             .then(quote => {
    //                 res.redirect('/home');
    //             })
    //             .catch(err => console.log(err));
    //             })
    //     .catch(err => console.log("You've already given like to this quote!", err));
    
    
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