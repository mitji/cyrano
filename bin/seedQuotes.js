const mongoose = require('mongoose');
const Quote = require('../models/Quote');
const User = require('../models/User');

require('dotenv').config();

const quotes = [
  [{
    text: 'I love you. Today. Right now. Just as you are.',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'en',
    type: ''
  }, 
  {
    text: "Love is a dream that came to life when we meet",
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'en',
    type: ''
  },
  {
    text: "You don't marry someone you can live with ... you marry the person who you cannot live without.",
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'en',
    type: ''
  },
  {
    text: 'Sometimes I can’t see myself when I’m with you. I can only just see you.',
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'en',
    type: ''
  },
  {
    text: "If we had just one cookie, I'd give you the big half. That's how much I love you.",
    //author: '5ddbba117c06d41722baa19f',
    likes: [],
    language: 'en',
    type: ''
  }
], // 1 user
[{
  text: 'The luckiest day of my life was the day that I met you.',
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "I love being with you more than anything else in the world.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "I don't think I could ever love anyone else the way that I love you.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: 'Love You to the Moon and Back',
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "i wanna know what love is … I want you to show me.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
], // 2 user
[{
  text: "Every day that we're together,  is a better day than the one before. I love you. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "With you is my very favorite place to be. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "There's no love like true love. There's no love like yours and mine.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "You're on my mind and in my heart.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "My night has become a sunny dawn because of you.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
],  // 3 user
[{
  text: "The water shines only by the sun. And it is you who are my sun. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "I know I am in love with you because my reality is finally better than my dreams. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "I will love you until the stars go out, and the tides no longer turn.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Every time I see you, I fall in love all over again.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Our Relationship is meant to be. Something that was written in the stars and drawn into our destiny.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
], // 4 user

[{
  text: "The water shines only by the sun. And it is you who are my sun. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "I know I am in love with you because my reality is finally better than my dreams. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "I will love you until the stars go out, and the tides no longer turn.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Every time I see you, I fall in love all over again.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Our Relationship is meant to be. Something that was written in the stars and drawn into our destiny.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
], // 5 user

[{
  text: "Just when I think that it is impossible to love you any more, you prove me wrong. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "I have loved you all my life; it has just taken me this long to find you. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "The best feeling is when you look at him…and he is already staring.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "To the world, you may be one person, but to one person you are the world.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Loving you never was an option. It was a necessity.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
], // 6 user
[{
  text: "I love you more than I have ever found a way to say to you.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "It is true that my heart always skips a beat when you take my name.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Never above you. Never below you. Always beside you. ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Love every little thing about you.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "The thing I love about you is pretty much everything.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
], // 7 user
[{
  text: "All I want is to love you and to wake up every morning with you by my side.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "You're all I need, and I simply want to tell you that I love you",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "I love you Today Tomorrow Always ",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "You're the better part of me that takes my whole world to a higher level. I love you",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "You have my heart… and you always will.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
], // 8 user
[{
  text: "To love you is to have all that I need in the world",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "You hold my heart. Always have. Always will.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "You fill all my senses and bring magic into my life.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "I am happiest when I’m right next to you.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "I swear I couldn’t love you more than I do right now, and yet I know I will tomorrow.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
], // 9 user
[{
  text: "You may hold my hand for a while, but you hold my heart forever.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}, 
{
  text: "I need you like a heart needs a beat.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "Come live in my heart and pay no rent.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "If I know what love is, it is because of you.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
},
{
  text: "There are only two times that I want to be with you. Now and Forever.",
  //author: '5ddbba117c06d41722baa19f',
  likes: [],
  language: 'en',
  type: ''
}
] // 10 user
]//end of quotes

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