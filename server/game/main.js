const io = require('socket.io-client')
const socket = io();

let movement = {
	up: false,
	left: false,
	right: false
}
import * as data from './level.json';
let level = data.level
let size = data.constants
const { width, height } = size;
const canvas = document.getElementById('canvas'),
			overlay = document.getElementById('overlay-text'),
			ctx = canvas.getContext('2d'),
			username = localStorage.getItem('username')

canvas.width = width;
canvas.height = height;
document.addEventListener('click', function(event){
	let active = document.activeElement;
	if(event.target == canvas || event.target == overlay){
		if(overlay.style.display != "none"){
			overlay.style.display = "none"
		}
	} else if (active != canvas){
		if(overlay.style.display != "flex"){
			overlay.style.display = "flex"
		}
	}
})
document.addEventListener('keydown', function(event) {
	let active = document.activeElement;
	if(active == canvas || active == overlay){
		if(overlay.style.display != "none"){
			overlay.style.display = "none"
		}
		switch (event.keyCode) {
			case 65: // a
			case 37: // arrow 
				movement.left = true;
				break;
			case 87: // w
			case 38: // arrow
			case 32: // space
				movement.up = true;
				break;
			case 68: // d
			case 39: // arrow
				movement.right = true;
				break;
		}
	} else if (active != canvas){
		if(overlay.style.display != "flex"){
			overlay.style.display = "flex"
		}
	}
});

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
		case 65: // a
		case 37: // arrow 
      movement.left = false;
      break;
		case 87: // w
		case 38: // arrow
		case 32: // space
      movement.up = false;
      break;
		case 68: // d
		case 39: // arrow
      movement.right = false;
      break;
  }
});



socket.emit('game create user', username)
setInterval(function(){
	socket.emit('game update', movement, username)
}, 1000 / 60)


// import level from './level-new.js';
socket.on('game update', function(players){
	ctx.clearRect(0, 0, width, height)
	ctx.beginPath();

	for (var i = 0; i < level.length; i++) {//print level
		ctx.fillStyle = level[i].color;
		ctx.fillRect(level[i].x, level[i].y, level[i].width, level[i].height);
	}
	ctx.font = "italic 15px Segoe UI"
	// ctx.fillStyle = "#c02942"
	ctx.fillStyle = "black"
	ctx.fillText("pro island", 312, 135)
	ctx.fillText("intermediate rock", 120, 235)
	ctx.fillText("noob continent", 190, 492)
	let list = Object.entries(players);
	for(let i = 0;i < list.length; i++){
		let cPlayer = players[list[i][0]]
		if (cPlayer.online){
			ctx.fillStyle = cPlayer.color;
			ctx.fillRect(cPlayer.x, cPlayer.y, cPlayer.width, cPlayer.height);
			ctx.font = "12px Segoe UI"
			let txt = list[i][0];

			ctx.fillText(txt, (cPlayer.x + 10) - (ctx.measureText(txt).width / 2), cPlayer.y - 2)
		}
	}
})