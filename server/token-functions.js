const jwt = require('jsonwebtoken');
function verifyToken(req, res){
	let token;
	token = req.session.token;
	try {
		jwt.verify(token, "secret")
		return true;
	} catch (err){
		console.log(err);
		res.sendStatus(403);
		return;
	}
}

function signToken(){

}

module.exports = {
	verifyToken: verifyToken,

}