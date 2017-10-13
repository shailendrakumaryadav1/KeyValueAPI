var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Task = require('./api/models/keyValueModel'), //created model loading here
  bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/key-value-db'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });


var routes = require('./api/routes/keyValueRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('key-value API server started on: ' + port);
