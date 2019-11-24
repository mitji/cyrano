var express = require('express');
var router = express.Router();
const homeRouter = require("./home");
const addRouter = require("./add");
const profileRouter = require("./profile");
const editProfileRouter = require("./edit-profile");

router.use('/home', homeRouter);
router.use('/add', addRouter);
router.use('/profile', profileRouter);
router.use('/edit-profile', editProfileRouter);

// USE (HORIZONTAL)
const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  }
  else {
  	res.redirect("/login");
  }  
}

router.get('/home', isLoggedIn,(req,res,next)=> {
  res.render('user/home');
});

router.get('/add', isLoggedIn,(req,res,next)=> {
  res.render('user/add');
});




module.exports = router;