function collisionCheck(a,b){
	let vX = (a.x + (a.width / 2)) - (b.x + (b.width / 2)),
			vY = (a.y + (a.height / 2)) - (b.y + (b.height / 2)),
			hWidths = (a.width / 2) + (b.width / 2),
			hHeights = (a.height / 2) + (b.height / 2),
			collision = null;
	
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights){
		let oX = hWidths - Math.abs(vX),
				oY = hHeights - Math.abs(vY)
		if (oX >= oY){
			if (vY > 0){
				collision = "top";
				a.y += oY;
			} else {
				collision = "bottom";
				a.y -= oY;
			}
		} else {
			if (vX > 0){
				collision = "left";
				a.x += oX;
			} else {
				collision = "right";
				a.x -= oX;
			}
		}
	}
	return collision;
}
module.exports = collisionCheck;