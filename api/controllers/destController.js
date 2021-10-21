'use strict';

var mongoose = require('mongoose'),
    Dest = mongoose.model('Dests'),
    DestInfo = mongoose.model('DestInfos');

exports.dest_list = function(req, res) {
  Dest.find({}, function(err, user) {
    if (err)
      res.send(err);
    console.log("dest list");
    res.json(user);
  });
};

exports.dest_info = function(req, res) {
  let destCode = req.body.destCode;
  console.log(req.body);

  console.log(destCode);
  DestInfo.find({dest_code: destCode}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      console.log("dest_info");
      res.json(user);
    }
  });
};