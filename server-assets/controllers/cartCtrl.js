var Cart = require('../models/cart');

var q = require('q');

var getCart = function (cartId) {
  var dfd = q.defer();
  Cart.find({
    _id: cartId
  }, function (err, results) {
    if (!err) {
      console.log('Cart found', results);
      dfd.resolve(results[0]);
    } else {
      console.log(err);
      dfd.reject(err);
    }

  });
  return dfd.promise;
}

module.exports = {
  addCart: function (req, res) {
    console.log(req.body);
    var cart = new Cart(req.body);
    cart.save().then(function (results) {
      console.log('result from cart save', results);
      res.status(201).send(results);
    });
  },

  addItem: function (req, res) {
    var cart = getCart(req.params.id).then(function (cart) {
      cart.products.push(req.body);
      cart.save().then(function (results) {
        console.log('results from cart update', results);
        res.status(200).send(results);
      });
    })
  }
}