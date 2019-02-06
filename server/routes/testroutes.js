const express = require('express');
const router = express.Router();
const path = require('path');
const {verifyToken} = require('../token-functions');

let isFirstRun = true;

router.get('/',(req, res,next)=>{
	verifyToken(req, res);
	res.sendFile(path.join(__dirname + '../../../index.html'))
})
module.exports = router;