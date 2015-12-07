var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');


var cartCtrl = require('./controllers/cartCtrl');
var productCtrl = require('./controllers/productCtrl');
var userCtrl = require('./controllers/userCtrl');

var port = 8080;
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '../Publicpublic'))
app.listen(port, function (err) {
  if (err) {
    console.log('server is live');
  } else {
    console.log('Server listening on port ' + port);
  }
});

mongoose.connect('mongodb://localhost/weekend-ecom');

app.post('/products', productCtrl.addProduct);
app.get('/products', productCtrl.getProducts);
app.get('/products/:id', productCtrl.getProduct);
app.put('/products/:id', productCtrl.updateProduct);
app.delete('/products/:id', productCtrl.removeProduct);

app.post('/cart', cartCtrl.addCart);
app.put('/cart/:id', cartCtrl.addItem);
app.put('/cart/:id/:productId', cartCtrl.removeItem);

app.post('/users', userCtrl.addUser);
app.get('/users/:username', userCtrl.getUser);