var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');

var ServiceSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
    trim: true
  },
  testMethod: {
    type: String,
    required: true,
    trim: true
  },
  fieldOfTesting: {
    type: String,
    required: true,
    trim: true
  },
  sampleType: {
    type: String,
    required: true,
    trim: true
  },
  testFee: {
    type: Number,
    required: true
  }

});

ServiceSchema.plugin(timestamp);

var Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;