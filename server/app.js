const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;
const timeGet = function () {
	let t = new Date;
	let tM = t.getMinutes();
	if (t.getMinutes() < 10){
		tM = "0" + t.getMinutes();
	}
	return `${t.getHours()}:${tM}`;
}
// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PATCH, POST")
  next();
});

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

	console.log(`Listening on port ${PORT}, ${timeGet()}`);
})