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

global.KEY_TIME_VALUES = 'KeyTimeValues';
module.exports = mongoose.model(KEY_TIME_VALUES, KeyTimeValueSchema);

var ValueSchema = new Schema({
  value: {
    type: Object,
    default: ''
  }
}, options);

global.VALUE = 'Value'
module.exports = mongoose.model(VALUE, ValueSchema);

var ErrorMessageSchema = new Schema({
  message: {
    type: String,
    default: ''
  }
}, options);

global.ERROR_MESSAGE = 'Error_Message';
module.exports = mongoose.model(ERROR_MESSAGE, ErrorMessageSchema);
