var mongoose = require('mongoose');

var Product = mongoose.model('product', new mongoose.Schema({

  title: {
    type: String,
    index: true,
    required: true
  },
  description: {
    type: String,
    maxlength: 100,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }

}));

module.exports = Product;