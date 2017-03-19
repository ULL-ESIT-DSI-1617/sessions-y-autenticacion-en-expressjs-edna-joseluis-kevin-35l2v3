"use strict"
let express = require('express');
let router = express.Router();
let bcrypt = require("bcrypt-nodejs");
let fs = require("fs");

let users = require("./../users.json");

router.get('/', function (req, res) {
	if (req.session.user in users) {
		if (req.session.user == "edna" || req.session.user == "joseluis" || req.session.user == "kevin") {
			res.render('layout', { header: "ERROR",
								   message: "Usuario " + req.session.user + " no puede cambiar su contraseña" });
		}
		else{
			res.render('updatePass', { username: req.session.user });
		}
	}
	else {
		res.render('layout', { header: "ERROR",
							   message: "No has iniciado sesión" });
	}
});

router.post('/', function(req, res){
	if (!req.body.password1 || !req.body.password2) {
		console.log("error cambiando contraseña");
		res.render('layout', { header: "ERROR",
							   message: "Error cambiando contraseña" });    
	}
	else if (req.body.password1 == req.body.password2) {
		users[req.session.user] = bcrypt.hashSync(req.body.password1);
		fs.writeFile("users.json", JSON.stringify(users), "utf8");
		console.log("contraseña cambiada para el usuario " + req.session.user);
		res.render('layout', { header: "HECHO!",
							   message: "Contraseña cambiada correctamente para el usuario " + req.session.user });
	}
	else {
		console.log("error cambiando contraseña");    
		res.render('layout', { header: "ERROR",
							   message: "Las contraseñas no coinciden" });    
	}
});

module.exports = router;
