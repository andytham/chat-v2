
let width= 300, 
height= 300

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
var players = {

}

function game () {

  function getPlayers(){
    return players;
  }
  
  function addPlayer(username){
		console.log("adding a player...");
    players[username] = {
      x: width / 2,
      y: height / 2,
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
  }

  function updatePlayer(playerData, username){
    players[username] = playerData
	}
	function disconnect(username){
		players[username].online = false
	}
	function connect(username){
		players[username].online = true
	}
	return {
		getPlayers,
		updatePlayer,
		addPlayer,
		disconnect,
		connect
	}
}

export default game;