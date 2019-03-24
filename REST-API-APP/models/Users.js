'use strict';
const mongoose = require('mongoose');
const joi = require('joi');
const joigoose = require('joigoose')(mongoose);
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const joiSchema2 = joi.object().keys({
  email: joi.string().required().lowercase().email().regex(re).trim(),
  password: joi.string().required().min(8).trim(),
  name: joi.string().required().min(2).trim(),
  job: joi.string().required().min(2).trim(),
  company: joi.string().required().min(3).trim(),
});


const UserSchema = new mongoose.Schema(joigoose.convert(joiSchema2));
const User = mongoose.model('User', UserSchema);
module.exports = User;



// var UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// var User = mongoose.model('User', UserSchema);
// module.exports = User;