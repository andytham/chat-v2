const jwt = require('jsonwebtoken');
module.exports = function verifyToken(req){
	let token;
	console.log(req.headers.authorization);
	console.log('from verify js');
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		console.log("should get token");
			token = req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		console.log('wtf is req query');
		token = req.query.token;
	} else {
		console.log("no token?");
		return false;
	}
	try {
		jwt.verify(token, "secret", function(err, decoded){console.log(decoded);})
		return true;
	} catch (err){
		console.log(err);
		return false;
	}
}