import React from 'react';
class Game extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		console.log("GAME MOUNTED");
		return(<script src={require('../../server/game/main')}></script>)
	}
	render(){
		return(
  		  <canvas id="canvas" tabIndex='1'></canvas>
		)
	}
}
export default Game;