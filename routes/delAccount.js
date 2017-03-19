"use strict"
let express = require('express');
let router = express.Router();
let bcrypt = require("bcrypt-nodejs");
let fs = require("fs");

let users = require("./../users.json");

router.get('/', function(req, res){
	if (req.session.user in users) {
		if (req.session.user == "edna" || req.session.user == "joseluis" || req.session.user == "kevin") {
			res.render('layout', { header: "ERROR",
								   message: "Usuario " + req.session.user + " no puede ser borrado" });
		}
		else{
			res.render('delAccount', { username: req.session.user });
		}
	}
	else {
		res.render('layout', { header: "ERROR",
							   message: "No has iniciado sesión" });
	}
});

router.post('/', function(req, res){
	if (!req.body.password1 || !req.body.password2) {
		console.log("error eliminando usuario");
		res.render('layout', { header: "ERROR",
							   message: "Debe completar todos los campos" });    
	}
	else if (req.body.password1 == req.body.password2){
		delete users[req.session.user];
		fs.writeFile("users.json", JSON.stringify(users), "utf8");
		req.session.destroy();
		console.log("usuario eliminado");
		res.render('layout', { header: "HECHO!",
							   message: "Usuario eliminado correctamente" });
	}
	else {
		console.log("error eliminando usuario");
		res.render('layout', { header: "ERROR",
							   message: "Las contraseñas deben coincidir" });
	}
});

module.exports = router;
