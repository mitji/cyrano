var express = require('express');
var router = express.Router();
const parser = require('../config/cloudinary');

const Users = require('./../models/User');

// delete profile
router.post('/delete/:id', (req, res, next) => {
    const { userId } = req.params;
    Users.deleteOne({_id:userId})
        .then( (user) => {
            console.log(user);
            
            res.redirect('/');
        })
        .catch( err => console.log(err));
});

router.post('/', parser.single('picture'), (req,res,next) => {
    const userId = req.session.currentUser._id;
    const { username,password,email,picture,bio} = req.body;
    
    if (typeof req.file != 'undefined') {
        image_url= req.file.secure_url;
    } else {
        image_url= '/images/avatar.png';
    }

    Users.updateOne({_id:userId},{ username,password,email,pictureUrl: image_url,bio}, {new:true})
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