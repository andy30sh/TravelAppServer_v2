'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

  exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
      if (err)
        res.send(err);
      console.log("list all users");
      res.json(user);
    });
  };
  
  exports.create_a_user = function(req, res) {
    console.log(req.body);
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      console.log("create new user");
      console.log(new_user);
      res.json(user);
    });
  };
  
  exports.read_a_user = function(req, res) {
    console.log(req.params.userId);
    //console.log();
    User.findOne({login_id: req.params.userId}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };

  exports.user_login = function(req, res) {
    console.log(req.params.userId);
    console.log(req.body.password);
    User.findOne({login_id: req.params.userId, password: req.body.password}, function(err, user) {
      if (err)
        res.send(err);
      if (user != null)
        res.json({ user_login: req.params.userId, last_login_date: user.last_login_date});
      else
        res.json([]);
    });
  };

  exports.update_a_user = function(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };