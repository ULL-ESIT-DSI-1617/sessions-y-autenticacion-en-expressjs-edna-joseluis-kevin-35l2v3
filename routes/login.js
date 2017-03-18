"use strict"
let express = require('express');
let router = express.Router();
let bcrypt = require("bcrypt-nodejs");

let users = require("./../users.json");

router.get('/', function(req, res){
	if (req.session.user in users) {
		res.render('layout', { header: "ERROR",
							   message: "Ya tiene una sesión iniciada como " + req.session.user });
	}
	else {
		res.render('login');
	}
});

router.post('/', function(req, res){
	if (!req.body.username || !req.body.password) {
		console.log("error iniciando sesión");
		res.render('layout', { header: "ERROR",
							   message: "Debe completar todos los campos" });
	}
	else if(req.body.username in users && bcrypt.compareSync(req.body.password, users[req.body.username])){
		req.session.user = req.body.username;
		req.session.admin = true;
		console.log("sesión iniciada como usuario " + req.session.user);
		res.render('layout', { header: "HECHO!",
							   message: "Sesión iniciada correctamente como usuario " + req.session.user });
	}
	else {
		console.log("error iniciando sesión");    
		res.render('layout', { header: "ERROR",
							   message: "Credenciales incorrectas" });
	}
});

module.exports = router;
