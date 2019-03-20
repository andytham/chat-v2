const { cr, timeGet , getRandomColor, API_URL} = require('./helpers');
let players = {};
const data = require('./game/level.json')
const level = data.level;
const { gravity, friction, jumpHeight, moveSpeed } = data.constants
const collisionCheck = require('./game/collision.js')


let Chatroom = cr();
let usersList = {};
function startSocket(server){
	const axios = require('axios');			
	const io = require('socket.io')(server);
	io.on('connection', function(socket){
		socket.on('join', function(user){
			// chat
			io.emit('history', Chatroom.getChatHistory())
			trackUser = user;
			if(user){
				console.log(user, "has joined");
				let joinMsg = {usr: "server", msg: `${user} has joined the server`, tme: timeGet()}
				Chatroom.addEntry(joinMsg)
				io.emit('message',joinMsg)
				usersList[socket.id] = user
			}
			// game
			// if player is found on the player list, use old settings
			if (players[usersList[socket.id]]){
				players[usersList[socket.id]].online = true
			}
			io.emit('update-status')
		})
		socket.on('disconnect', function(){
			// chat
			if(usersList[socket.id]){
				console.log(usersList[socket.id], 'user disconnected');
				let disconnectMsg = {usr: "server", msg: `${usersList[socket.id]} has disconnected.`, tme: timeGet()}
				Chatroom.addEntry(disconnectMsg)
				io.emit('message',disconnectMsg)
				axios.patch(`${API_URL}/sessions`,
				{
					username: usersList[socket.id],
					lastOnline: timeGet("full"),
					currentStatus: "offline"
				}).catch(err => console.log(err))
			}
			// game
			if (players[usersList[socket.id]]){
				players[usersList[socket.id]].online = false
			}

		});
		socket.on('message', function(msg){
			// chat
			console.log('message received');
			Chatroom.addEntry(msg)
			socket.broadcast.emit('message',msg)
		});
		socket.on('whisper', function(msg){
			console.log('backend whisper fired');
			let targetId = Object.keys(usersList).find(id => {
				return usersList[id] == msg.target
			})
			console.log(targetId, 'target id');
			console.log(usersList[targetId]);
			msg.whisper = true;
			msg.outgoing = true;
			io.to(`${targetId}`).emit('message', msg)
		})
		socket.on('update-status', function(data){
			// game
			// change player status so game knows to start/stop drawing player
			if (players[usersList[socket.id]] && data){
				players[usersList[socket.id]].online = data.online
			}
			io.emit('update-status')
		})
		socket.on('game create user', function(username){
			// game create user when player joins
			players[username] = {
				x: 15,
				y: 320,
				width: 20,
				height: 20,
				jumpHeight: jumpHeight,
				moveSpeed: moveSpeed,
				velX: 0,
				velY: 0,
				jumping: false,
				grounded: false,
				color: getRandomColor(),
				online: true
			}
		})
		socket.on('game update', function(movement, username) {
			// game update movement, this occurs on the interval set below
			let player = players[username] || {};
			if (movement.up){
				if (!player.jumping && player.grounded) {
					player.jumping = true;
					player.grounded = false;
					player.velY = -player.jumpHeight * 1; //how high to jump
				}
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
			player.velX *= friction;
			player.velY += gravity;
	
			player.grounded = false; // if walking off an edge, it will force gravity check

			for (var i = 0; i < level.length; i++) { // correct player position if colliding
				// check collision and 'push' player away
				var dir = collisionCheck(player, level[i]);
				if (dir === "left" || dir === "right") {
						player.velX = 0;
						player.jumping = false;
				} else if (dir === "bottom") {
						player.grounded = true;
						player.jumping = false;
				} else if (dir === "top") {
						player.velY *= -1;
				}
			}
			if(player.grounded){
				player.velY = 0;
			}
		
			player.x += player.velX;
			player.y += player.velY;
		})
	})
	// on socket start, also run game update at 60fps.
	setInterval(function(){
		io.emit('game update', players)
	}, 1000/60)
}

module.exports = startSocket;