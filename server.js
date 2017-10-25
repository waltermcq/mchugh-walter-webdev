
var app           = require('./express');
var bodyParser    = require('body-parser'); // use body parser module to parse JSON from HTTP body
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// app.use(session({ secret: process.env.SESSION_SECRET }));  // configure secret; lets session library sign cookie
app.use(session({ secret: "testy test",
                  resave: true,
                  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));
require('./assignment/app');
require ('./test/app');

// server init / listen
var port = process.env.PORT || 3000;
app.listen(port);