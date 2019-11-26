var express = require('express');
var router = express.Router();
const homeRouter = require("./home");
const homeRandomRouter = require("./home-random");
const homeTopRouter = require("./home-top");
const addRouter = require("./add");
const searchRouter = require("./search");
const profileRouter = require("./profile");
const editProfileRouter = require("./edit-profile");

router.use('/home', homeRouter);
router.use('/home-random', homeRandomRouter);
router.use('/home-top', homeTopRouter);
router.use('/add', addRouter);
router.use('/search', searchRouter);
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