const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
// - specify how many salt rounds
const saltRounds = 10;

require('dotenv').config();

const users = [
  {
    username: 'Erik',
    email: 'erik@gmail.cat',
    password: 'Erik',
    pictureUrl: 'https://cdn5.vectorstock.com/i/1000x1000/23/49/new-man-avatar-icon-flat-vector-19152349.jpg',
    bio: 'Tus imperfecciones te convierten en la mujer perfect',
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'David',
    email: 'david@gmail.cat',
    password: 'David',
    pictureUrl: 'https://cdn5.vectorstock.com/i/1000x1000/23/49/new-man-avatar-icon-flat-vector-19152349.jpg',
    bio: 'Te haría mellizos hasta que salieran impares',
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Rafa',
    email: 'rafa@gmail.cat',
    password: 'Rafa',
    pictureUrl: 'https://cdn5.vectorstock.com/i/1000x1000/23/49/new-man-avatar-icon-flat-vector-19152349.jpg',
    bio: 'Tus ojos son como dos uvas, tu boca como una manzana. ¡Qúe buena ensalada de fruta haríamos con mi banana!',
    quotes: [],
    favorites: [],
    liked: [], 
  },
  {
    username: 'Michal',
    email: 'michal@gmail.cat',
    password: 'Michal',
    pictureUrl: 'https://cdn5.vectorstock.com/i/1000x1000/23/49/new-man-avatar-icon-flat-vector-19152349.jpg',
    bio: 'No sé nada de amor, estoy casado',
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
      console.log(user.password);
      return user
    })
    return User.create(encrypUsers);
  })
  .then( (insertedDocuments) => {
    console.log('Inserted documents: ', insertedDocuments.length);
    mongoose.connection.close();
  })
  .catch( (err) => console.log(err));