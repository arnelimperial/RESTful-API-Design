'use strict';
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const joi = require('joi');
const joigoose = require('joigoose')(mongoose);

const joiSchema1 = joi.object().keys({
    testName: joi.string().required().trim(),
    testMethod: joi.string().required().trim(),
    fieldOfTesting: joi.string().required().trim(),
    sampleType: joi.string().required().trim(),
    testFee: joi.number().required().precision(2),

     
});



const ServiceSchema = new mongoose.Schema(joigoose.convert(joiSchema1));
ServiceSchema.plugin(timestamp);
const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;


//const ServiceSchema = new mongoose.Schema({
  //   testName: {
  //     type: String,
  //     required: true,
  //     trim: true
  //   },
  //   testMethod: {
  //     type: String,
  //     required: true,
  //     trim: true
  //   },
  //   fieldOfTesting: {
  //     type: String,
  //     required: true,
  //     trim: true
  //   },
  //   sampleType: {
  //     type: String,
  //     required: true,
  //     trim: true
  //   },
  //   testFee: {
  //     type: Number,
  //     required: true
  //   }
  
  // });
  
  // ServiceSchema.plugin(timestamp);
  
  // //const Service = mongoose.model('Service', ServiceSchema);
  // //module.exports = Service;