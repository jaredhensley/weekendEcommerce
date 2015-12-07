var Product = require('../models/product');

module.exports = {

  addProduct: function (req, res) {
    console.log('post body in addproduct', req.body);
    var product = new Product(req.body);
    product
      .save()
      .then(function (results) {
        console.log('Result from saving product', results);
        res.status(201).send(results);
      });
  },

  getProducts: function (req, res) {
    console.log('get body in getproduct', req.body);
    Product.find().exec().then(function (products) {
      console.log('Products returned: ', products)
      res.status(200).send(products);
    });
  },

  getProduct: function (req, res) {
    Product.find({
      _id: req.params.id
    }).exec().then(function (product) {
      if (!product.length) {
        res.status(404).end();
      } else {
        res.status(200).send(product);
      }
    });
  },

  updateProduct: function (req, res) {
    console.log('update product in updateproduct', req.body);
    Product.update({
        _id: req.params.id
      }, req.body,
      function (err, results) {
        if (err) {
          res.stats(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
  },

  removeProduct: function (req, res) {
    console.log('remove product in removeproduct', req.body);
    Product.remove({
      _id: req.params.id
    }, function (err, results) {
      if (!err) {
        res.status(204).end();
      } else {
        res.status(500).send(err);
      }
    });
  }

}