// Get all the tools we need
var express  = require('express');
var app = express();
var port = process.env.PORT || 1337;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');



// configurations
mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine','ejs');


// require for passport
app.use(session({ secret: 'NiucsxNe.JuoYktWMBCgYrpITVR0r'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);

