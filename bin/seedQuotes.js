const mongoose = require('mongoose');
const Quote = require('../models/Quote');

const quotes = [
  {
    text: 'Tus imperfecciones te convierten en la mujer perfect',
    author: '5dd7c2c75518031befa0919f',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'Te haría mellizos hasta que salieran impares',
    author: '5dd7c2c75518031befa0919f',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'Tus ojos son como dos uvas, tu boca como una manzana. ¡Qúe buena ensalada de fruta haríamos con mi banana!',
    author: '5dd7c2c75518031befa0919f',
    likes: [],
    language: 'es',
    type: ''
  },
  {
    text: 'No sé nada de amor, estoy casado',
    author: '5dd7c2c75518031befa0919f',
    likes: [],
    language: 'es',
    type: ''
  }
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