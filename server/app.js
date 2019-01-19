const express = require('express');
const app = express();
const path = require('path');

const timeGet = require('./timeGet');
const PORT = process.env.PORT || 8080;

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PATCH, POST")
  next();
});

//body parser to handle request bodies incoming from the client
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

//socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cr = require('./chat-socket.js');
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
			io.emit('message', Chatroom.getChatHistory());
		});
})


//URL get
app.use(express.static('build'));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '../index.html'))
})
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})
app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})

const historyRoutes = require('./mvc/history.js');
app.use('/api/history', historyRoutes);

server.listen(PORT, (err) => {

	console.log(`Listening on port ${PORT}, ${timeGet("tm")}`);
})