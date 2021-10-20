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
    default: ''
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

// Dests collections
var DestSchema = new Schema({
  dest_code: {    // City code
    type: String,
    required: 'no dest code!',
    unique: true
  },
  dest_name: {    // Australian cities
    type: String,
    required: 'no dest name!'
  },
  dest_region: {  // Australian states
    type: String,
    required: 'no dest region!',
    unique: true
  }
});

module.exports = mongoose.model('Dests', DestSchema);

var DestInfoSchema = new Schema({
  dest_code: {    // City code
    type: String,
    required: 'no dest code!',
    unique: true
  },
  covid_status: {
    type: String,
    default: 'no information'
  },
  boarder_control: {
    type: String,
    default: 'no information'
  },
  Quarantine_info: {
    type: String,
    default: 'no information'
  },
  last_update_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('DestInfos', DestInfoSchema);