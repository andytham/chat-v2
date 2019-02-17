import constants from './game/constants.js';
const { width, height, keys, gravity, friction } = constants;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
var players = {
	"test": {
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
		color: "blue"
	}
}
export function game () {

  function getPlayers(){
		// console.log("retrieving players...");
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
	return {
		getPlayers,
		updatePlayer,
		addPlayer
	}
}

export default game;