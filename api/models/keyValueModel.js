'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var KeyTimeValueSchema = new Schema({
  key: {
    type: String,
    required: 'Kindly enter the key'
  },
  timestamp: {
    type: Number,
    default: 0
  },
  value: {
    type: Object,
    default: ''
  }
});

module.exports = mongoose.model('KeyTimeValues', KeyTimeValueSchema);


var ValueSchema = new Schema({
  value: {
    type: Object,
    default: 'Value1'
  }
});

module.exports = mongoose.model('Value', ValueSchema);

var ErrorMessageSchema = new Schema({
  message: {
    type: String,
    default: "No message"
  }
});

module.exports = mongoose.model('Error_Message', ErrorMessageSchema);

console.log('Models created!!!');