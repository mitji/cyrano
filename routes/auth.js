var express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

var router = express.Router();

// - specify how many salt rounds
const saltRounds = 10;

// POST ´/auth/signup´
router.post('/signup', ( req,res,next) => {
    
    // 1 destrcture username and password    
    const { username, password,email,pic,bio} = req.body;

    if ( username ==='' || password === '' || email ==='' ){
        res.render('auth-views/signup', {errorMessage:'Provide valid inputs'});
        return;
    } 

    User.findOne({username})
        .then( (user) =>{
            if(user) {
                res.render('auth-views/signup', {errorMessage: 'User already created'});
                return;
            }
        // id doesn't exists generate salts ans hash
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password,salt);

        // once user is encrypted we add to db

        User.create({username, password: hashedPassword, email, pic, bio})
            .then(()=>{
                console.log('User added successfully');
                res.redirect('/');
            } )
            .catch(err  => {
                res.render('auth-views/signup', { errorMessage:' error while creating new user'});
            });

    })// end of then
    .catch( (err) => console.log(err));
})// end of post

// POST /auth/login
router.post('/login', (req, res, next) => {
    // Deconstruct the username and the password
    const {username, password: enteredPasword} = req.body;
    console.log(req.body);
    

    // check if username and password are empty strings
    if ( username ==='' || enteredPasword === ''){
        res.render('index', {errorMessage:'Provide username and password'});
        console.log('Provide username and password');
        return;
    }

    // Find the user by username
    User.findOne( {username} )
        .then( (user) => {
            // If doesn't exist - return error
            console.log('in 1');
            
            if(!user) {
                res.render('index', {errorMessage:"Username doesn't exist"});
                return;
            }

            // If username exists - check if the pswd is correct
            const hashedPasswordFromDb = user.password;
            const passwordCorrect = bcrypt.compareSync(enteredPasword, hashedPasswordFromDb);

            // If password is correct - create session and cookie and redirect
            console.log('passwordCorrect -->', passwordCorrect);
            
            if (passwordCorrect) {
                console.log('correct pswd');
                
                // Save the login in the session (and create cookie)
                // And redirect the user
                req.session.currentUser = user;
                res.redirect('/');
                console.log('logged in');
            } else {
                res.render('index', {errorMessage:"Password incorrect!"});
                return;
            }
        })
        .catch( (err) => console.log(err));
})


module.exports = router;
