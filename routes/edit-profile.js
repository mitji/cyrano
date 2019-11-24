var express = require('express');
var router = express.Router();

const Quotes = require('./../models/Quote');
const Users = require('./../models/User');



router.post('/', (req,res,next) => {
    const userId = req.session.currentUser._id;
    const { username,password,email,picture,bio} = req.body;
    
    //console.log('updated user:', updatedUSer.username);

    Users.updateOne({_id:userId},{ username,password,email,picture,bio}, {new:true})
        .then(()=> {
            //console.log({ user,password,email,picture,bio});
            console.log(" inside update");
            res.redirect('/profile');
        
        })
        .catch((error) => console.log(err))

});


router.get('/', ( req,res,next) => {
    const userId = req.session.currentUser._id;
    Users.findById({_id: userId})
        .then((user) => {
            res.render('user/edit-profile', { user :user});
        })


});



module.exports=router;