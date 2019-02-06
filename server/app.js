const express = require('express');
const app = express();
const path = require('path');

const timeGet = require('./timeGet');
const PORT = process.env.PORT || 8080;
const jwt = require('jsonwebtoken')

//debug log in console
const logger = require('morgan');
app.use(logger("dev"));
//body parser to handle request bodies incoming from the client
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.head('*', (req, res, next)=> {
	console.log('global head');
	console.log(req.headers.authorization);
	next();
})

//without this middleware get, app.head on '*' runs twice?
app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})

//near top level otherwise will get unexpected token error and other errors
// express.static is also serving '/'? overwriting any other calls to the root, so place those over?
app.use(express.static('build')) 

//middleware that runs on every request incoming
app.use(function(req, res, next) {	
	// CORS
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "PATCH, POST, OPTIONS, GET, HEAD")
  next();
});

function verifyToken(req, res, next){
	let token;
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		console.log("should get token");
			token = req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		console.log('wtf is req query');
		token = req.query.token;
	}
	try {
		jwt.verify(token, "secret")
		return true;
	} catch (err){
		console.log(err);
		return false;
	}
}
function checkToken(req, res, next){
	const header = req.headers['authorization'];
	console.log(req.headers);
	if(typeof header !== 'undefined') {
			const bearer = header.split(' ');
			const token = bearer[1];

			req.token = token;
			next();
	} else {
			//If header is undefined return Forbidden (403)
			res.sendStatus(403)
	}
}

function verifyJWT(req, res){

	jwt.verify(req.token, 'secret', (err, authorizedData) => {
		if(err){
				//If error send Forbidden (403)
				console.log('ERROR: Could not connect to the protected route');
				res.sendStatus(403);
		} else {
				//If token is successfully verified, we can send the autorized data 
				res.json({
						message: 'Successful log in',
						authorizedData
				});
				console.log('SUCCESS: Connected to protected route');
		}
})
}

let count = 0;
function checkHeader(req,res,next){
	count += 1;
	console.log(count);
	console.log('middleware',req.headers.authorization);
	next()
}


// app.use(function(err, req, res, next) {
	
// 	console.log("middleware err", err.name);
// 	if (err.name === 'UnauthorizedError') {
// 		res.redirect('/login')
// 	}
// 	next();
// })
//URL get
// app.get('/', (req, res) => {
// 	console.log("i ran");
// 	res.sendFile(path.join(__dirname + '../index.html'))
// })
const logRoute = require('./mvc/testroutes')
app.use('/login', logRoute);

// app.get('/login', checkHeader, (req, res) => {
// 	console.log("i ran too");
// 	res.sendFile(path.join(__dirname + '../../index.html'))
// })

app.get('/chat', (req,res)=>{
		res.sendFile(path.join(__dirname + '../../index.html'))
})
app.head('/chat',(req, res) => {
	console.log('HEAD IS HAPPENING HELLO??');	
})

//socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cr = require('./chat-func.js');
let Chatroom = cr();
let usersList = {};
//server side socket emitters
io.on('connection', function(socket){
	  //when user joins the server
		socket.on('join', function(user){
			io.emit('history', Chatroom.getChatHistory())
			if(user){
				console.log(user, "has joined");

				Chatroom.addEntry({usr: "server", msg: `${user} has joined the server`, tme: timeGet()})
				io.emit('message', Chatroom.getChatHistory())
				usersList[socket.id] = user
			}
		})
		socket.on('disconnect', function(){
			if(usersList[socket.id]){
				console.log(usersList[socket.id], 'user disconnected');
				Chatroom.addEntry({usr: "server", msg: `${usersList[socket.id]} has disconnected.`})
				io.emit('message', Chatroom.getChatHistory())
			}
		});
		socket.on('message', function(msg){
			console.log('message: ' + msg);
			Chatroom.addEntry(msg)
			// io.emit('message', Chatroom.getChatHistory());
			// io.emit('message', msg)
			socket.broadcast.emit('message',msg)
		});
})

server.listen(PORT, (err) => {

	console.log(`Listening on port ${PORT}, ${timeGet("hm")}`);
})