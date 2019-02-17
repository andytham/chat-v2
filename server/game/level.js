import constants from './constants.js';
const { width, height} = constants;

const level = []

// x to width, maybe swap to xStart, xEnd
//bounds
level.push({
	x: 0,
	y: 0,
	width: 10,
	height: height,
	color: 'orange'
})
level.push({//box for the ground
	x: 0,
	y: height - 10,
	width: width,
	height: 50,
	color: 'orange'
});
level.push({//box on right
	x: width - 10,
	y: 0,
	width: 50,
	height: height,
	color: 'orange'
});
level.push({ //top
	x: 0,
	y: 0,
	width: width,
	height: 10,
	color: 'orange'
})
level.push({
	x: width/5,
	y: height / 1.5,
	width: 50,
	height: 10,
	color: 'orange'
})
export default level;