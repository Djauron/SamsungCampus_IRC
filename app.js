var express = require('express');
var app = express();
var session = require('express-session');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var path = require('path');
var db = require('./app/config/db.js');
var User = require('./app/model/User.js');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var passwordHash = require('password-hash');


app.set('views', path.join('./app/', 'views'));
app.set('view engine', 'twig');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:'toto',
    resave: true,
    saveUninitialized: true}));
app.use(flash());

require('./app/chat/socket.js')(io);
require('./app/config/route.js')(app);




server.listen(8070);