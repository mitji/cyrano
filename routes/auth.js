var express = require('express');
var router = express.Router();

const User = require('./../models/User');

// Require bcrypt

const bcrypt = require('bcrypt');

// - specify how many salt rounds
const saltRounds = 10;

// Post ' auth /signup'

router.post('/signup', ( req,res,next)=>{
    // 1 destrcture username and password
const { username, password,email,pic,bio} = req.body;

if ( username ==='' || password === '' || email ==='' ){
        res.render('auth/signup', {errorMessage:'Provide valid inputs'});
        return;
    } 

User.findOne({username})
    .then( (user) =>{
        if(user) {
            res.render('auth/signup', {errorMessage: 'User already created'});
            return;
        }
    // id doesn't exists generate salts ans hash
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password,salt);

    // once user is encrypted we add to db

    User.create({username, password: hashedPassword})
        .then((newUser)=>{
            console.log('added user successfully');
            res.redirect('/');
        } )
        .catch(err  => {
            res.render('auth/signup', { errorMessage:' error while creating new user'});
        });

    })// end of then


    .catch( (err) => console.log(err));


})// end of post


module.exports = router;
