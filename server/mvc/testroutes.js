const express = require('express');
const router = express.Router();
const path = require('path');
const verifyToken = require('./verify');

let isFirstRun = true;

router.get('/',(req, res,next)=>{
	if (isFirstRun){
		isFirstRun = !isFirstRun
		if(!verifyToken(req)){
			res.sendStatus(403)
			return;
		}
	} else {
		isFirstRun = !isFirstRun
	}
	res.sendFile(path.join(__dirname + '../../../index.html'))
})
module.exports = router;