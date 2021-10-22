var express = require('express'),
    app = express(),
    port = process.env.PORT || 8088,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'), //created model loading here
    Dest = require('./api/models/destModel'), //created model loading here
    bodyParser = require('body-parser'),
    dbInit = require('./api/models/dbInit');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TravelApp'); 

// dbInit.initData(); // bug found if deplicate record

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRoutes = require('./api/routes/userRoute'); //importing route
var destRoutes = require('./api/routes/destRoute'); //importing dest route

userRoutes(app); //register the route
destRoutes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Travel App Server RESTful API server started on: ' + port);