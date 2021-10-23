'use strict';

const mailac = require('../../mailac.js'); // import gmail account 
const mailFrom = 'noreply@travlapp.com';
var nodemailer = require('nodemailer');

var MD5 = require('crypto-js/md5'); // hash password
const randtoken = require('rand-token');

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

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
        // Send mail <================
        console.log("send email");
        console.log(mailac); 
        var transporter = nodemailer.createTransport(mailac);
        var mailOptions = {
          from: mailFrom,
          to: new_user.email,
          subject: 'Travel App New Registration',
          text: 'Your activation code of Account Registration: ' + user.activateCode
        };
        transporter.sendMail(mailOptions, function(err, info) {
          if(err) {
            console.log(err);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        // End send mail
        res.json({user_login: user.login_id, created_date: user.created_date});
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
          console.log(token);
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
        User.findOneAndUpdate({login_id: userId}, {status: 'normal', login_token: token, activation_token: 'xxx', last_login_date: Date.now()}, {new: false}, 
          function(err, result) {
            if(err)
              res.send(err);
            console.log(result);
            res.json({user_login: userId, login_token: token, last_login_date: result.last_login_date});
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
        let token = randtoken.generate(16).toString();
        User.findOneAndUpdate({login_id: userId}, {password: newPasswd, login_token: token, last_login_date: Date.now()}, {new: false}, 
          function(err, result) {
            if(err) {
              res.send(err);
            } else {
              console.log(result);
              res.json({user_login: userId, login_token: token, last_login_date: result.last_login_date});
            }
          });
      } else {
        res.json({result: 'Change password fail!'});
      }
    });
  };

  exports.forget_password = function(req, res) {
    let userId = req.body.userId;
    let userEmail = req.body.email;
    console.log(userId + '|' + userEmail);
    
    User.findOne({login_id: userId, email: userEmail, status: 'normal'}, function(err, user) {
      if (err) {
        res.send(err);
      }
      if (user != null) {
        console.log(user);
        let token = randtoken.generate(16).toString();
        User.findOneAndUpdate({login_id: userId}, {activation_token: token}, {new: false}, 
          function(err, result) {
            if(err) {
              res.send(err);
            } else {
              // Send mail <================
              console.log("send email");
              console.log(mailac); 
              var transporter = nodemailer.createTransport(mailac);
              var mailOptions = {
                from: mailFrom,
                to: result.email,
                subject: 'Travel App Password Reset',
                text: 'Your activation code of reset password request: ' + result.activateCode
              };
              transporter.sendMail(mailOptions, function(err, info) {
                if(err) {
                  console.log(err);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              // End send mail
              console.log(result);
              res.json({user_login: userId, status: result.status});
            }
          });
      } else {
        res.json({result: 'Incorrect login ID and email!'});
      }
    });
  };

  exports.reset_password = function(req, res) {
    let userId = req.body.userId;
    let newPasswd = req.body.newPassword;
    let activateCode = req.body.activateCode;
    console.log(userId + '|' + activateCode + '|' + newPasswd);
    
    newPasswd = MD5(newPasswd).toString();
    User.findOne({login_id: userId, activation_token: activateCode, status: 'normal'}, function(err, user) {
      if (err) {
        res.send(err);
      }
      if (user != null) {
        console.log(user);
        let token = randtoken.generate(16).toString();
        User.findOneAndUpdate({login_id: userId}, {password: newPasswd, activation_token: 'xxx', login_token: token, last_login_date: Date.now()}, {new: false}, 
          function(err, result) {
            if(err) {
              res.send(err);
            } else {
              console.log(result);
              res.json({user_login: userId, login_token: token, last_login_date: result.last_login_date});
            }
          });
      } else {
        res.json({result: 'Reset password fail!'});
      }
    });
  };

  exports.check_login = function(token, callback){
    if(token === ''){
      callback(false);
      return;
    }
    User.findOne({login_token: token}, function(err, result) {
      if(result) {
        console.log('find ' + token);
        console.log(result);
        callback(true);
      } else {
        console.log('not find ' + token);
        console.log(result);
        callback(false);
      }
    });
  }