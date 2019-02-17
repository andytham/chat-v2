import collisionCheck from './collision.js';
import level from './level.js';
import constants from './constants.js';
const { width, height, keys, gravity, friction } = constants;

import game from '../game-helper';
// let Game = game();
(function () {
	window.requestAnimationFrame =	window.requestAnimationFrame ||
																	window.mozRequestAnimationFrame ||
																	window.webkitRequestAnimationFrame ||
																	window.msRequestAnimationFrame;
})();

const canvas = document.getElementById('canvas'),
			ctx = canvas.getContext("2d") //ie only supports 2d

let currentPlayer = localStorage.getItem("username");
let checkList = game().getPlayers()
if (!checkList[currentPlayer]){
	game().addPlayer(currentPlayer)
} else {
	game().connect(currentPlayer)
}
console.log(game().getPlayers());
// const switchPlayers = document.getElementById('switch');
// switchPlayers.addEventListener('click',()=>{
// 	console.log(currentPlayer);
// 	if (currentPlayer == "name"){
// 		currentPlayer = "test"
// 	} else {
// 		currentPlayer = "name"
// 	}
// })
canvas.width = width;
canvas.height = height;
function update(){
	// check keys
	let players = game().getPlayers()
	let player = players[currentPlayer]
	if (keys[38] || keys[32] || keys[87]) {// up arrow or space
		if (!player.jumping && player.grounded) {
				player.jumping = true;
				player.grounded = false;
				player.velY = -player.jumpHeight * 2.5;//how high to jump
		}
	}
	if (keys[39] || keys[68]) {// right arrow
			if (player.velX < player.jumpHeight) {
					player.velX += player.moveSpeed;
			}
	}
	if (keys[37] || keys[65]) {// left arrow
			if (player.velX > -player.jumpHeight) {
					player.velX -= player.moveSpeed;
			}
	}
	//update player position
	player.velX *= friction;
	player.velY += gravity;

	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	
	player.grounded = false; // if walking off level, it will force gravity
	for (var i = 0; i < level.length; i++) {//print level
		ctx.fillStyle = level[i].color;
		ctx.rect(level[i].x, level[i].y, level[i].width, level[i].height);

		var dir = collisionCheck(player, level[i]); //check collision and 'push' player away
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
	game().updatePlayer(player, currentPlayer)
	ctx.fill();//Draw charater stuff
	ctx.fillStyle = player.color;
	
	let list = Object.entries(players);
	for(let i = 0;i < list.length; i++){
		let cPlayer = players[list[i][0]]
		if (cPlayer.online){
			ctx.fillStyle = cPlayer.color;
			ctx.fillRect(cPlayer.x, cPlayer.y, cPlayer.width, cPlayer.height);
			ctx.fillText(list[i][0], cPlayer.x, cPlayer.y)
		}
	}
	window.requestAnimationFrame(update);
}


document.body.addEventListener("keydown", function (e) {
	if(e.target == canvas){
		keys[e.keyCode] = true;
	}
});

document.body.addEventListener("keyup", function (e) {
	
	keys[e.keyCode] = false;
});
window.onbeforeunload = function(){
	game().disconnect(currentPlayer);
	return false;
}
// window.addEventListener("load", function () {
// 	console.log("loaded");
// 	update();
// });
update();