const socket = io();

let movement = {
	up: false,
	left: false,
	right: false
}

document.addEventListener('keydown', function(event) {
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