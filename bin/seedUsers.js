const mongoose = require('mongoose');
const User = require('../models/User');

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

mongoose.connect('mongodb://localhost:27017/cyranoDb', {useNewUrlParser: true})
  .then( () => {
    return User.create(users);
  })
  .then( (insertedDocuments) => {
    console.log('Inserted documents: ', insertedDocuments.length);
    mongoose.connection.close();
  })
  .catch( (err) => console.log(err));