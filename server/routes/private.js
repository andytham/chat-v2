const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

function verifyToken(token){
	try {
		jwt.verify(token, "secret")
		return true;
	} catch (err){
		console.log(err);
		return false;
	}
}

router.get('/',(req, res,next)=>{
	let token;
	token = req.session.cookie;
	if (verifyToken(req.session.token)){
		res.sendFile(path.join(__dirname + '../../../index.html'))
		return;
	} else {
		res.sendStatus(403);
		return;
	}

})
module.exports = router;