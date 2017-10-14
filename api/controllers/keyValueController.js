'use strict';

var mongoose = require('mongoose'),
  KeyTimeValues = mongoose.model('KeyTimeValues'),
  Value = mongoose.model('Value'),
  Error_Message = mongoose.model('Error_Message');

exports.create_a_key_value_pair = function (req, res) {
  console.log(req.body);
  var key, value, timestamp = Date.now();
  timestamp = (timestamp - timestamp % 1000) / 1000;
  var jsonBody = req.body;
  for (var k in jsonBody) {
    if (jsonBody.hasOwnProperty(k)) {
      key = k;
      value = jsonBody[k];
    }
  }

  console.log('key is = ' + key);
  console.log('value is = ' + value);

  var key_value_item = new KeyTimeValues({
    key: key,
    value: value,
    timestamp: timestamp
  })

  console.log('made key value item is = ' + key_value_item);

  var query = { key: key, timestamp: timestamp },
    update = { value: value },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  KeyTimeValues.findOneAndUpdate(query, update, options, function (err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(result);
    res.json(result);
  });
};

exports.read_a_key = function (req, res) {
  console.log('Reading a key');
  var key = req.params.key,
    timestamp = req.query.timestamp;
  console.log('Requested key is ' + key);
  if (timestamp)
    console.log('Timestamp is ' + timestamp);
  else {
    timestamp = Date.now();
    timestamp = (timestamp - timestamp % 1000) / 1000;
    console.log('Timestamp is absent, use now timestamp = ' + timestamp);
  }

  KeyTimeValues.find({ "key": key }, function (err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    }

    if (result.length == 0) {
      // no key exist in KeyTimeValues datastore.
      var error_msg = new Error_Message({
        message: 'Key does not exist'
      });
      console.log(error_msg);
      res.status(404).send(error_msg);
    }
    else {
      // find value corresponding to timestamp.
      var max = -1, index = -1;
      for (var i = 0; i < result.length; i++) {
        var item = result[i];
        if (item.timestamp > max && item.timestamp <= timestamp) {
          max = item.timestamp;
          index = i;
        }
      }

      if (index == -1) {
        // key does not exist at this time.
        var error_msg = new Error_Message({
          message: 'Key does not exist at this timestamp'
        });
        console.log(error_msg);
        res.status(404).send(error_msg);
      }
      else {
        // key-value is at index;
        var value = new Value({
          value: result[index].value
        });
        console.log(value);
        res.json(value);
      }
    }
  });
};
