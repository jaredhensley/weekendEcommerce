var User = require('../models/user');

var cartCtrl = require('./cartCtrl');

module.exports = {
  addUser: function (req, res) {
    cartCtrl.addCart().then(function (cart) {
      req.body.cart = cart._id;
      var user = new User(req.body);
      user.save().then(function (results) {
        console.log('results from user creation', results);
        res.status(201).send(results);
      });
    });
  },

  getUser: function (req, res) {
    console.log(req.body);
    User.find({
      username: req.params.username.toLowerCase()
    }).populate({
      path: 'cart',
      populate: {
        path: 'products.product',
        model: 'product'
      }
    }).exec().then(function (results) {
      console.log('results from getting user', results);
      res.status(200).send(results);
    });
  }
}