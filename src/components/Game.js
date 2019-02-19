import React from 'react';
class Game extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		return(
			<script src={require('../../server/game/main')}></script>)
	}
	render(){
		return(
			<div className="game">
  		  <canvas id="canvas" tabIndex='1'></canvas>
			</div>
		)
	}
}
export default Game;