const isDbInit = false;   // true to import initial database content

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./certificate/server-key.pem', 'utf8');
var certificate = fs.readFileSync('./certificate/server-cert.pem', 'utf8');
credentials = {key: privateKey, cert: certificate};

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8088,
    ports = 8443,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'), //created model loading here
    Dest = require('./api/models/destModel'), //created model loading here
    bodyParser = require('body-parser'),
    dbInit = require('./api/models/dbInit');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TravelApp'); 

if (isDbInit) {
    console.log('Database content initial');
    dbInit.initData(); // execute datebase content initial 
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRoutes = require('./api/routes/userRoute'); //importing route
var destRoutes = require('./api/routes/destRoute'); //importing dest route

userRoutes(app); //register the route
destRoutes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(port);
httpsServer.listen(ports);

console.log('Travel App Server RESTful API HTTP server started on: ' + port);
console.log('Travel App Server RESTful API HTTPs server started on: ' + ports);