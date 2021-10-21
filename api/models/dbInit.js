var mongoose = require('mongoose'),
    Dest = mongoose.model('Dests'),
    DestInfo = mongoose.model('DestInfos'),
    destListData,
    destInfoData;


exports.initData = function(req, res) {

    Dest.deleteMany({}, function (err) {
        console.log("success");
        const fs = require('fs');

        fs.readFile('./destdata/destListData.json', (err, data) => {
            if (err) throw err;
            destListData = JSON.parse(data);
            console.log(destListData);
    
            destListData.forEach(function(data) {
                new Dest( data ).save();
            });    
        });
    });
    
    DestInfo.deleteMany({}, function (err) {
        console.log("success");

        const fs = require('fs');
  
        fs.readFile('./destdata/destInfoData.json', (err, data) => {
            if (err) throw err;
            destInfoData = JSON.parse(data);
            console.log(destInfoData);
    
            destInfoData.forEach(function(data) {
                new DestInfo( data ).save();
            });    
        });
    });

};