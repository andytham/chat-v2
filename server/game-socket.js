
function start(server){
	const {game} = require('./helpers');
	const io = require('socket.io')(server);
	io.on('connection', function(socket){
		Game = game()
		socket.on('game-add-player', function(username){
			Game.addPlayer(username)
			io.emit('game-update', Game.getPlayers())
		})
		socket.on('game-connect', function(username){
			Game.connect(username)
			io.emit('game-update', Game.getPlayers())
		})
		socket.on('game-disconnect', function(username){
			Game.disconnect(username)
			io.emit('game-update', Game.getPlayers())
		})
		socket.on('game-get-players', function(){
			io.emit('game-update', Game.getPlayers())
		})
		socket.on('game-update', function(playerData, username){
		
				Game.updatePlayer(playerData, username)
				console.log(playerData.x);
				io.emit('game-update', Game.getPlayers())
			
		})
	})
}



module.exports = start;