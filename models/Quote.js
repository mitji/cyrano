const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema

const quoteSchema = new Schema({
  text: String,
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  language: String,
  type: String
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;