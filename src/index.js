import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './components/Root';

import { BrowserRouter as Router } from 'react-router-dom'

render(
	// <Root store={store} />, document.getElementById('root')
	<Provider store={store}>
		<Router>
			<App />
		</Router> 
	</Provider>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept();
}