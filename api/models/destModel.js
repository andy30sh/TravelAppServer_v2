'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
    required: 'no dest region!'
  }
});

module.exports = mongoose.model('Dests', DestSchema);

var DestInfoSchema = new Schema({
  dest_code: {    // City code
    type: String,
    required: 'no dest code!',
    unique: true
  },
  border_status: {
    type: String,
    default: 'no information'
  },
  covid_status: {
    type: String,
    default: 'no information'
  },
  lockdown_status: {
    type: String,
    default: 'no information'
  },
  covid_dashboard_link: {
    type: String,
    default: 'no information'
  },
  Activity_restriction_link: {
    type: String,
    default: 'no information'
  },
  travel_restriction_link: {
    type: String,
    default: 'no information'
  },
  last_update_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('DestInfos', DestInfoSchema);