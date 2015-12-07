var mongoose = require('mongoose');

var Cart = mongoose.model('Cart', new mongoose.Schema({
  products: [{
    product: {
      type: String,
      ref: 'Product'
    },
    qty: {
      type: Number
    }
  }],
  total: {
    type: Number,
    default: 0
  }
}));

module.exports = Cart;