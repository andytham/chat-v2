//server side socket emitters
function startEmitters(server){
	const io = require('socket.io')(server);
	const { cr, timeGet } = require('./helpers');
	let Chatroom = cr();
	let usersList = {};
	const axios = require('axios');
	io.on('connection', function(socket){
	  //when user joins the server
		socket.on('join', function(user){
			console.log('server join fired');
			io.emit('history', Chatroom.getChatHistory())
			trackUser = user;
			if(user){
				console.log(user, "has joined");
				let joinMsg = {usr: "server", msg: `${user} has joined the server`, tme: timeGet()}
				Chatroom.addEntry(joinMsg)
				// io.emit('message', Chatroom.getChatHistory())
				io.emit('message',joinMsg)
				usersList[socket.id] = user
			}
		})
		socket.on('disconnect', function(){
			console.log("disconnect socket running");
			if(usersList[socket.id]){
				console.log(usersList[socket.id], 'user disconnected');
				let disconnectMsg = {usr: "server", msg: `${usersList[socket.id]} has disconnected.`, tme: timeGet()}
				Chatroom.addEntry(disconnectMsg)
				// io.emit('message', Chatroom.getChatHistory())
				io.emit('message',disconnectMsg)
				axios.patch(`http://localhost:8080/sessions`,
				{
					username: usersList[socket.id],
					lastOnline: timeGet("full"),
					currentStatus: "offline"
				}).catch(err => console.log(err))
			}
		});
		socket.on('message', function(msg){
			console.log('server socket.on message fired');
			Chatroom.addEntry(msg)
			// io.emit('message', Chatroom.getChatHistory());
			// io.emit('message', msg)
			socket.broadcast.emit('message',msg)
		});
	})
}
module.exports = startEmitters;