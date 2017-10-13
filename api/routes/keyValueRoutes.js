'use strict';
module.exports = function (app) {
  var keyValueController = require('../controllers/keyValueController');

  // keyValueController Routes
  app.route('/object')
    .post(keyValueController.create_a_key_value_pair);


  app.route('/object/:key')
    .get(keyValueController.read_a_key);

};

console.log('Routes created');