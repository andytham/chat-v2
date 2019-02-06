const express = require('express');
const router = express.Router();
const path = require('path');


router.head('/', (req, res, next)=>{
	console.log("HEAD RECEIVED");
	console.log(req.headers.authorization);
	next();
})
router.get('/',(req, res,next)=>{
	res.sendFile(path.join(__dirname + '../../../index.html'))
})
module.exports = router;