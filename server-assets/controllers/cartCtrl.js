var Cart = require('../models/cart');
var q = require('q');


// function to query for interesting cart
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

  // build new Cart for user
  addCart: function (req, res) {
    var dfd = q.defer();
    var cartObj = {
      product: []
    };
    var cart = new Cart(cartObj);
    cart.save().then(function (results) {
      console.log('result from cart save', results);
      dfd.resolve(results);
      res.status(201).send(results);
    });
    return dfd.promise;
  },

  // add item to interesting Cart 
  addItem: function (req, res) {
    var cart = getCart(req.params.id).then(function (cart) {
      cart.products.push(req.body);
      cart.save().then(function (results) {
        console.log('results from cart update', results);
        res.status(200).send(results);
      });
    })
  },

  removeItem: function (req, res) {
    getCart(req.params.id).then(function (cart) {
      for (item in cart.products) {
        if (cart.products[item].product === req.params.productId) {
          cart.products.splice(item, 1);
          cart.save().then(function (results) {
            console.log('results from removing item from from', results);
            res.status(200).send(results);
          });
        }
      }
    });
  }


}