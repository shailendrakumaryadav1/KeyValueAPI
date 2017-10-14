let express = require('express'),
  app = express(),
  port = 8080,
  mongoose = require('mongoose'),
  models = require('./api/models/keyValueModel'), //created model loading here
  bodyParser = require('body-parser'),
  config = require('config');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });


var routes = require('./api/routes/keyValueRoutes'); //importing route
routes(app); //register the route

app.listen(port);
module.exports = app;

console.log('key-value API server started on: ' + port);
