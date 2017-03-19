"use strict"
let express = require('express');
let router = express.Router();

let users = require("./../users.json");

router.get('/', function (req, res) {
	if(!(req.session.user in users)){
		res.render('layout', { header: "ERROR",
							   message: "No has iniciado sesión." });
	}
	else{
	req.session.destroy();
	console.log("sesión cerrada");
	res.render('logout');
	}
});

module.exports = router;
