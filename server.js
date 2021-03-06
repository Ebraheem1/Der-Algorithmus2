var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var multer = require('multer');
var paginate = require('express-paginate');
var expressValidator = require('express-validator');
var router = require('./app/routes');
var path = require('path');
var app = express();
//Database name is Algorithmus
var DB_URI = "mongodb://localhost:27017/Algorithmus";
var path = require('path');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public')); //make the dir public available to the frontend
//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());
//To remove the warning
mongoose.Promise = global.Promise;

//pagination
app.use(paginate.middleware(10, 50));

//for all the requests(routes) to the app, respond by the index page
/*app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
});*/

//DB connection
mongoose.connect(DB_URI, function(err) {
    if (err) {
        console.log('There is an erroor: ' + err);

    } else {
        console.log('Success!');
    }
});

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());

//using the routes file
app.use('/api', router);
//Global Vars as well


app.use('/api', router);

app.use(function(req, res, next) {
    res.locals.req = req;
    res.locals.res = res;
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
});

//app.use(router);

//For any wrong get requests
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
app.listen(8080, function() {

    console.log('The server is listening on port 8080.....');

});
