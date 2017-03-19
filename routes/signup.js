"use strict"
let express = require('express');
let router = express.Router();
let bcrypt = require("bcrypt-nodejs");
let fs = require("fs");

let users = require("./../users.json");

router.get('/', function(req, res){
	if (req.session.user in users) {
		res.render('layout', { header: "ERROR",
							   message: "Ya tiene una sesión iniciada como " + req.session.user });
	}
	else {
		res.render('signup');
	}
});

router.post('/', function(req, res){
	if (!req.body.username || !req.body.password1 || !req.body.password2) {
		console.log("error registrando nuevo usuario");
		res.render('layout', { header: "ERROR",
							   message: "Debe completar todos los campos" });    
	}
	else if (req.body.username in users){
		console.log("error registrando nuevo usuario");
		res.render('layout', { header: "ERROR",
							   message: "Ya existe un usuario con ese nombre" });
	}
	else if (req.body.password1 == req.body.password2){
		users[req.body.username] = bcrypt.hashSync(req.body.password1);
		fs.writeFile("users.json", JSON.stringify(users), "utf8");
		req.session.user = req.body.username;
		req.session.admin = true;
		console.log("registrado nuevo usuario " + req.session.user);
		res.render('layout', { header: "HECHO!",
							   message: "Registrado nuevo usuario " + req.session.user + " y sesión iniciada" });
	}
	else {
		console.log("error registrando nuevo usuario");
		res.render('layout', { header: "ERROR",
							   message: "Las contraseñas deben coincidir" });
	}
});

module.exports = router;
