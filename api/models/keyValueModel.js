'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// transform for sending as json
function omitPrivate(doc, ret) {
  delete ret.__v;
  delete ret._id;
  return ret;
}

// schema options
var options = {
  toObject: {
    transform: omitPrivate
  },
  toJSON: {
    transform: omitPrivate
  }
};

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
}, options);

module.exports = mongoose.model('KeyTimeValues', KeyTimeValueSchema);

var ValueSchema = new Schema({
  value: {
    type: Object,
    default: ''
  }
}, options);

module.exports = mongoose.model('Value', ValueSchema);

var ErrorMessageSchema = new Schema({
  message: {
    type: String,
    default: "No message"
  }
}, options);

module.exports = mongoose.model('Error_Message', ErrorMessageSchema);

console.log('Models created!!!');