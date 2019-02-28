import React from 'react';
import { Logout } from './Logout';

import Button from '@material-ui/core/Button';
function handleClick(){
	let theme = 
	document.documentElement.getAttribute('data-theme');
	if (theme == "dark"){
		document.documentElement.setAttribute('data-theme', 'light')
	} else {
		document.documentElement.setAttribute('data-theme', 'dark')
	}
}
function ActionPanel(){
	return(
		<div className="action-panel">
			<Logout />
			<Button className="button night" onClick={handleClick}>
				NIGHT
			</Button>
			<Button className="button github" href="https://github.com/andytham">
				GITHUB
			</Button>
		</div>

	)
}

export default ActionPanel;