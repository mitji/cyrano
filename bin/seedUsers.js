const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
// - specify how many salt rounds
const saltRounds = 10;

require('dotenv').config();

const users = [
  {
    username: 'John',
    email: 'John@gmail.cat',
    password: 'John',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845217/usersimages/ryxxlufshtlmhybuuh2e.jpg",
    bio: 'I love you more than console.log',
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Mary',
    email: 'Mary@gmail.cat',
    password: 'Mary',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845803/usersimages/idudv2tytcol0xnfrsaz.png",
    bio: 'Live without you its like a lab without commits',
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'James',
    email: 'James@gmail.cat',
    password: 'James',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845217/usersimages/ryxxlufshtlmhybuuh2e.jpg",
    bio: 'You make my hearth beat like getting 0 errors in hard katas',
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Patricia',
    email: 'Patricia@gmail.cat',
    password: 'Patricia',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845803/usersimages/idudv2tytcol0xnfrsaz.png",
    bio: "I can't live another day without git push",
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Robert',
    email: 'Robert@gmail.cat',
    password: 'Robert',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845217/usersimages/ryxxlufshtlmhybuuh2e.jpg",
    bio: "All you need is undefined ",
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Linda',
    email: 'Linda@gmail.cat',
    password: 'Linda',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845803/usersimages/idudv2tytcol0xnfrsaz.png",
    bio: 'Let me populate our collections',
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Michael',
    email: 'Michael@gmail.cat',
    password: 'Michael',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845217/usersimages/ryxxlufshtlmhybuuh2e.jpg",
    bio: 'Git push it, baby',
    quotes: [],
    favorites: [],
    liked: [], 
  }, 
  {
    username: 'Jennifer',
    email: 'Jennifer@gmail.cat',
    password: 'Jennifer',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845803/usersimages/idudv2tytcol0xnfrsaz.png",
    bio: "I'll be back",
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'William',
    email: 'William@gmail.cat',
    password: 'William',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845217/usersimages/ryxxlufshtlmhybuuh2e.jpg",
    bio: "Copy paste and success",
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Susan',
    email: 'Susan@gmail.cat',
    password: 'Susan',
    pictureUrl: "https://res.cloudinary.com/cyranoapp/image/upload/v1574845803/usersimages/idudv2tytcol0xnfrsaz.png",
    bio: "It must be a typo",
    quotes: [],
    favorites: [],
    liked: [], 
  },



]

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then( () => {
    const encrypUsers = users.map(user => {
      const salt = bcrypt.genSaltSync(saltRounds);
      user.password = bcrypt.hashSync(user.password,salt);
      //console.log(user.password);
      return user
    })
    return User.create(encrypUsers);
  })
  .then( (insertedDocuments) => {
    console.log('Inserted documents: ', insertedDocuments.length);
    mongoose.connection.close();
  })
  .catch( (err) => console.log(err));