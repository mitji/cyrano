var express = require('express');
var router = express.Router();

const authRouter = require('./auth')
const loginRouter = require("./login");
const signupRouter = require("./signup");




router.use('/auth', authRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
