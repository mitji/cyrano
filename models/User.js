const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  pictureUrl: String,
  bio: String,
  quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
  favorites: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
  liked: [{type: Schema.Types.ObjectId, ref: 'Quote'}], 
});

const User = mongoose.model('User', userSchema);

module.exports = User;