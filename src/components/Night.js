import React from 'react';

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
function Night(){
	return(
		<Button className="button night" onClick={handleClick}>
			NIGHT
		</Button>
	)
}

export default Night;