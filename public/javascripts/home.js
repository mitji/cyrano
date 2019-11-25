

const likeBtn = document.getElementById('#like-btn');
const likesText = document.getElementById('#likes-text');

// likeBtn.addEventListener('click', () => {
//     const userId = req.session.currentUser._id;
//     const {_id} = req.query;
//     // get array of likes
//     Quotes.findById({_id: _id})
//         .then(quote => {
//             const likesArr = quote.likes;
//             let isInLikes = false;
//             likesArr.forEach(likeId => {
//                 console.log('likeId:', typeof likeId);
//                 console.log('userId', typeof userId);
//                 if(likeId == userId) {
//                     isInLikes = true;
//                     return;
//                 }
//             });
//             // update like
//             if (isInLikes) {
//                 console.log("You've already given like to this quote!");
//                 //res.redirect('/home');
//                 return;
//             }
//             console.log('-----New like!'); 
//             console.log('- initial likes', quote.likes);
//             likesArr.push(userId);
//             console.log('- updated likes',likesArr); 
//             console.log('isInLikes',isInLikes);
            
//             Quotes.updateOne({_id: _id}, {likes: likesArr})
//                 .then(quote => {
//                     console.log('likes update');
//                     likesText.innerHTML = quote.likes.length;
//                     //res.redirect('/home');
//                 })
//                 .catch(err => console.log(err));
//                 })
//         .catch(err => console.log(err));
// })