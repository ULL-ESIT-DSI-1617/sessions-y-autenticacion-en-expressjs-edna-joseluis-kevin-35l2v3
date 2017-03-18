"use strict"
let express = require('express'),
	app = express(),
	session = require('express-session');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let bcrypt = require("bcrypt-nodejs");
let path = require('path');

let users = require("./users.json");

app.set('port', (process.env.PORT || 8080));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
	secret: '2C44-4D44-WppQ38S',
	resave: true,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	console.log("Cookies :  ", req.cookies);
	console.log("session :  ", req.session);
	next();
});

// Middleware de autenticación y autorización
let auth = function(req, res, next) {
	if (req.session && req.session.user in users){
		return next();
	}
	else{
		res.render('layout', { header: "ERROR",
							   message: "No autorizado" });
	}
};

app.get('/', function(req, res) {
	res.render('index', { message: "Bienvenido!" });
});

let login = require('./routes/login');
app.use('/login', login);

let logout = require('./routes/logout');
app.use('/logout', logout);

let updatePass = require('./routes/updatePass');
app.use('/updatePass', updatePass);

let signup = require('./routes/signup');
app.use('/signup', signup);

let delAccount = require('./routes/delAccount');
app.use('/delAccount', delAccount);

app.get('/content/*?', 
	auth  // siguiente solo si se autentica
);

app.use('/content', express.static(path.join(__dirname, 'public')));

let server = app.listen(app.get('port'), function () {
	console.log('Servidor escuchando en el puerto %s', app.get('port'));
});
