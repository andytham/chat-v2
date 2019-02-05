const express = require('express');
const app = express();
const path = require('path');

const timeGet = require('./timeGet');
const PORT = process.env.PORT || 8080;
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken')

app.use(express.static('build')); //this should be top level so that the js files are served (will get unexpected token error)

//body parser to handle request bodies incoming from the client
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))


app.use(function(err, req, res, next) {
	console.log(err);
	console.log(req);
	console.log("hello");
	if (err.name === 'UnauthorizedError') {
		res.redirect('/login')
	}
	
	// CORS
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PATCH, POST")

  next();
});

// app.get('/poop', (res,req,next)=>{console.log("wtf");next()},()=>{console.log('wtf2');})

// app.use(jwtMiddleware({secret: "secret"}).unless({path: ['/login']}))
// app.use(jwtMiddleware({ secret: 'secret'}).unless({path: ['/chat']}));
// app.use('/chat', jwtMiddleware({secret:"secret"}))
// app.get('/',(req, res) => {res.redirect('/chat')})//doesnt work




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


//URL get
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname + '../index.html'))
// })
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})
app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})

const historyRoutes = require('./mvc/history.js');
app.use('/api/history', historyRoutes);
const userRoutes = require('./mvc/users.js');
app.use('/users', userRoutes);
server.listen(PORT, (err) => {

	console.log(`Listening on port ${PORT}, ${timeGet("hm")}`);
})