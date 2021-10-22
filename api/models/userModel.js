'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const randtoken = require('rand-token');

// Users collections

var UserSchema = new Schema({
  first_name: {
    type: String,
    required: 'no first name'
  },
  last_name: {
    type: String,
    required: 'no last name'
  },
  email: {
    type: String,
    required: 'no email'
  },
  login_id: {
    type: String,
    required: 'no login',
    unique: true
  },
  password: {
    type: String,
    required: 'no password'
  },
  login_token: {
    type: String,
    default: 'xxx'
  },
  activation_token: {
    type: String,
    default: function() { 
        return randtoken.generate(16); 
    }
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  last_login_date: {
    type: Date,
    default: null
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'normal', 'disabled']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Users', UserSchema);