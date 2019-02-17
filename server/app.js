const express = require('express');
const app = express();
const path = require('path');

const { timeGet , getRandomColor} = require('./helpers');
const PORT = process.env.PORT || 8080;
//debug log in console
const logger = require('morgan');
app.use(logger("dev"));
//handle request bodies incoming from the client
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
const session = require('express-session');
//redis for persistence
// const RedisStore = require('connect-redis')(session);
// const sessionStore = new RedisStore({host: "localhost"})

app.use(express.static('build')) 
//near top level otherwise will get unexpected token error and other errors
//express.static is also serving '/'? overwriting any other calls to the root, so place those over?

app.use(session({
	secret: "secretSession",
	// store: sessionStore,
	resave: true,
	saveUninitialized: true,
	cookie: {
		originalMaxAge: null,
  	maxAge: 60 * 60 * 1000,
    httpOnly: true,
		// secure: true, // https only?
	}
}))

app.get('/login', (req,res)=>{
	res.sendFile(path.join(__dirname + '../../index.html'))
})
app.get('/register', (req,res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})

const privateRoute = require('./routes/private');
app.use('/chat', privateRoute);

//login POST
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

//chat history routes
const historyRoute = require('./routes/history');
app.use('/api/history', historyRoute);

const sessionsRoute = require('./routes/usersSessions');
app.use('/sessions', sessionsRoute);

//redirect on 403
app.use(function(err, req, res, next) {
	if(403 == err.status) {
		res.redirect('/login')
	}
});


const server = require('http').createServer(app);
//socket.io
const chat = require('./chat-socket');
chat(server);
// const game = require('./game-socket')
// game(server)
let players = {};
io.on('connection', function(socket){
	let username = localStorage.getItem('username')
	socket.on('game create user', function(){
		players[username] = {
			x: 300 / 2,
			y: 300 / 2,
			width: 20,
			height: 20,
			jumpHeight: 5,
			moveSpeed: 5,
			velX: 0,
			velY: 0,
			jumping: false,
			grounded: false,
			color: getRandomColor(),
			online: true
		}
	})
	socket.on('game update', function(movement) {
		let player = players[username] || {};
		if (movement.up){
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.jumpHeight * 2.5;//how high to jump
		}
		if (movement.left){
			if (player.velX > -player.jumpHeight) {
				player.velX -= player.moveSpeed;
			}
		}
		if (movement.right){
			if (player.velX < player.jumpHeight) {
				player.velX += player.moveSpeed;
			}
		}
	})
})
const io = require('socket.io')(server);

setInterval(function(){
	io.emit('game update', players)
}, 1000/30)
// setInterval(function() {
// 	io.emit('message', {usr: "dickhead",msg: "fuck", tme: timeGet()});
// }, 1000 / 60);
server.listen(PORT, (err) => {
	console.log(`Listening on port ${PORT}, ${timeGet("hm")}`);
})