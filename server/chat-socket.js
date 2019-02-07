//server side socket emitters
function startEmitters(server){
	const io = require('socket.io')(server);
	const { cr, timeGet } = require('./helpers');
	let Chatroom = cr();
	let usersList = {};
	
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
			console.log('server socket.on message fired');
			Chatroom.addEntry(msg)
			// io.emit('message', Chatroom.getChatHistory());
			// io.emit('message', msg)
			socket.broadcast.emit('message',msg)
		});
	})
}
module.exports = startEmitters;