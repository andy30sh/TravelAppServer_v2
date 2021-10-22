var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Dest = mongoose.model('Dests'),
    DestInfo = mongoose.model('DestInfos'),
    userData,
    destListData,
    destInfoData;

exports.initData = function(req, res) {
    /* */
    User.deleteMany({}, function (err) {
        console.log("Read user success");
        const fs = require('fs');

        fs.readFile('./initdata/userData.json', (err, data) => {
            if (err) throw err;
            userData = JSON.parse(data);
            console.log(userData);
    
            userData.forEach(function(data) {
                new User(data).save();
            });
            console.log('\nImport user success\n');  
        });
    });
    
    /* */
    Dest.deleteMany({}, function (err) {
        console.log("Read destList success");
        const fs = require('fs');

        fs.readFile('./initdata/destListData.json', (err, data) => {
            if (err) throw err;
            destListData = JSON.parse(data);
            console.log(destListData);
    
            destListData.forEach(function(data) {
                new Dest(data).save();
            });
            console.log('\nImport destList success\n');   
        });
    });
    
    /* */
    DestInfo.deleteMany({}, function (err) {
        console.log("Read destInfo success");
        const fs = require('fs');
  
        fs.readFile('./initdata/destInfoData.json', (err, data) => {
            if (err) throw err;
            destInfoData = JSON.parse(data);
            console.log(destInfoData);
    
            destInfoData.forEach(function(data) {
                new DestInfo(data).save();
            });    
            console.log('\nImport destInfo success\n'); 
        });
    }); 
    
};