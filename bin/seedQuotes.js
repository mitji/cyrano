const mongoose = require('mongoose');
const Quote = require('../models/Quote');

const quotes = [
  {
    text: 'Tus imperfecciones te convierten en la mujer perfect',
    author: '5dd7d07f1008e8f30bdaa06b',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'Te haría mellizos hasta que salieran impares',
    author: '5dd7d07f1008e8f30bdaa06c',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'Tus ojos son como dos uvas, tu boca como una manzana. ¡Qúe buena ensalada de fruta haríamos con mi banana!',
    author: '5ddaabf58613ee2ae7e44b74',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'No sé nada de amor, estoy casado',
    author: '5dd7d07f1008e8f30bdaa06b',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'I love you more than I have ever found a way to say to you.',
    author: '5dd7d07f1008e8f30bdaa06b',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'I love you. Today. Right now. Just as you are.',
    author: '5dd7d07f1008e8f30bdaa06b',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'Love is a dream that came to life when we meet',
    author: '5dd7d07f1008e8f30bdaa06b',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: "If I could reach up and hold a star for every time you've made me smile, the entire evening sky would be in the palm of my hand",
    author: '5dd7d07f1008e8f30bdaa06b',
    likes: [],
    language: 'es',
    type: ''
  },
]

mongoose.connect('mongodb://localhost:27017/cyranoDb', {useNewUrlParser: true})
  .then( () => {
    return Quote.create(quotes);
  })
  .then( (insertedDocuments) => {
    console.log('Inserted documents: ', insertedDocuments.length);
    mongoose.connection.close();
  })
  .catch( (err) => console.log(err));