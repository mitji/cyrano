var express = require('express');
var router = express.Router();

const authRouter = require('./auth')
const loginRouter = require("./login");
const signupRouter = require("./signup");
const logoutRouter = require("./logout");


router.use('/auth', authRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/logout', logoutRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
