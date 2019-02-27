const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

function verifyToken(token){
	try {
		jwt.verify(token, "secret")
		return true;
	} catch (err){
		// console.log(err);
		console.log('JWT verification failed');
		return false;
	}
}

router.get('/',(req, res, next) => {
	let token;
	console.log("JWT Check...");
	token = req.session.cookie;
	if (verifyToken(req.session.token)){
		console.log("JWT Verified");
		res.sendFile(path.join(__dirname + '../../../index.html'))
		return;
	} else {
		// res.sendStatus(403);
		res.redirect('/login')
		return;
	}
})

module.exports = router;