'use strict';

var mongoose = require('mongoose'),
    Dest = mongoose.model('Dests'),
    DestInfo = mongoose.model('DestInfos'),
    user = require('../controllers/userController');

exports.dest_list = function(req, res) {
    let loginToken = req.query.loginToken;

    user.check_login(loginToken, function(result){
        if(result === true){
            Dest.find({}, function(err, user) {
                if (err)
                res.send(err);
                console.log("dest list");
                res.json(user);
            });
        }else{
            console.log(result);
            res.json({result: 'loginToken is wrong!'});
        }
    });
};

exports.dest_info = function(req, res) {
    let loginToken = req.body.loginToken;

    user.check_login(loginToken, function(result){
        if(result === true){
            console.log(result);
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
        }else{
            console.log(result);
            res.json({result: 'loginToken is wrong!'});
        }
    });
};