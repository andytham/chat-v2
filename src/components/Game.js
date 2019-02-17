import React from 'react';
class Game extends React.Component {
	constructor(){
		super()
	}
	render(){
		return(
			<div>
				
				<script src={require('../../server/game/main')}></script>

			</div>
		)
	}
}
export default Game;