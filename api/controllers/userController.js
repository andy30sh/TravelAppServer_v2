'use strict';

var MD5 = require('crypto-js/md5'); // hash password
const randtoken = require('rand-token');

var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Dest = mongoose.model('Dests'),
    DestInfo = mongoose.model('DestInfos');

 // =============== User ======================

  exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
      if (err) 
        res.send(err);
      console.log("list all users");
      res.json(user);
    });
  };
 
  exports.user_create = function(req, res) {
    console.log(req.body);
    var new_user = new User(req.body);

    new_user.password = MD5(new_user.password).toString();
    new_user.save(function(err, user) {
      if (err) {
        res.send(err);
      } else {
        console.log("created new user");
        console.log(new_user);
        res.json({user_login: new_user.user_login, created_date: new_user.created_date});
      }
    });
  };


  exports.user_login = function(req, res) {
    let userId = req.body.userId;
    let userPasswd = req.body.password;
    console.log(userId + '|' + userPasswd);

    userPasswd = MD5(userPasswd).toString();
    console.log(userPasswd);
    User.findOne({login_id: userId, password: userPasswd}, function(err, user) {
      if (err) {
        res.send(err);
      }
      if (user != null) {
        if (user.status != 'normal') {
          res.json({result: 'Accout not active!'});
        } else {
          //console.log(user);
          let token = randtoken.generate(16).toString();
          User.findOneAndUpdate({login_id: userId},  {login_token: token, last_login_date: Date.now()}, {new: false}, 
          function(err, result) {
            if(err) {
              res.send(err);
            } else {
              console.log(result);
            }
          });
          res.json({user_login: userId, login_token: token, last_login_date: user.last_login_date});
        }
      } else {
       res.json({result: 'Login fail!'});
      }
    });
  };

  exports.user_activate = function(req, res) {
    let userId = req.body.userId;
    let userPasswd = req.body.password;
    let activateCode = req.body.activateCode;
    console.log(userId + '|' + userPasswd + '|' + activateCode);
    
    userPasswd = MD5(userPasswd).toString();
    User.findOne({login_id: userId, password: userPasswd, activation_token: activateCode, status: 'pending'}, function(err, user) {
      if (err) {
        res.send(err);
      }
      if (user != null) {
        //console.log(user);
        let token = randtoken.generate(16).toString();
        User.findOneAndUpdate({login_id: userId}, {status: 'normal', login_token: token, last_login_date: Date.now()}, {new: false}, 
          function(err, result) {
            if(err)
              res.send(err);
            console.log(result);
            res.json({user_login: userId, login_token: token, last_login_date: user.last_login_date});
          });
      } else {
        res.json({result: 'Activate fail!'});
      }
    });
  };

  exports.user_change_password = function(req, res) {
    let userId = req.body.userId;
    let userPasswd = req.body.password;
    let newPasswd = req.body.newPassword;
    console.log(userId + '|' + userPasswd + '|' + newPasswd);
    
    userPasswd = MD5(userPasswd).toString();
    newPasswd = MD5(newPasswd).toString();
    User.findOne({login_id: userId, password: userPasswd, status: 'normal'}, function(err, user) {
      if (err) {
        res.send(err);
      }
      if (user != null) {
        //console.log(user);
        User.findOneAndUpdate({login_id: userId}, {password: newPasswd, last_login_date: Date.now()}, {new: false}, 
          function(err, result) {
            if(err)
              res.send(err);
            console.log(result);
            res.json({user_login: req.params.userId, last_login_date: user.last_login_date});
          });
      } else {
        res.json({result: 'Change password fail!'});
      }
    });
  };

// =============== Dest ======================

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

