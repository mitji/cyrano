const mongoose = require('mongoose');
const Quote = require('../models/Quote');
const User = require('../models/User');

require('dotenv').config();

const quotes = [
  [{
    text: 'Tus imperfecciones te convierten en la mujer perfect',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'es',
    type: ''
  }, {
    text: 'I love you. Today. Right now. Just as you are.',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'es',
    type: ''
  }],
  [{
    text: 'Te haría mellizos hasta que salieran impares',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'es',
    type: ''
  }],
  [{
    text: 'Tus ojos son como dos uvas, tu boca como una manzana. ¡Qúe buena ensalada de fruta haríamos con mi banana!',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'es',
    type: ''
  }],
  [{
    text: 'No sé nada de amor, estoy casado',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'es',
    type: ''
  }, {
    text: 'I love you more than I have ever found a way to say to you.',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'es',
    type: ''
  }, {
    text: 'Love is a dream that came to life when we meet',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'es',
    type: ''
  }],
]

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then( () => {
    User.find()
      .then(users => {
        const quotePromises = quotes.map(quoteArr => {
          const updatedQuoteArr = quoteArr.map( (quoteObj, i) => {
            quoteObj.author = users[i]._id;
            return quoteObj
          })

          return Quote.create(updatedQuoteArr);
        })

        Promise.all(quotePromises)
          .then( (quotesCreated) => {
            console.log('Inserted documents: ', quotesCreated.length);
            mongoose.connection.close();
          })
          .catch( (err) => console.log(err));
      })
    
  })