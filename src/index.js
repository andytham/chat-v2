import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './components/Root';
import { history } from './redux/helper';
// import { BrowserRouter as Router } from 'react-router-dom'
import { Router } from 'react-router-dom';
import xhr from './helpers/header';
// xhr();

render(
	// <Root store={store} />, document.getElementById('root')
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router> 
	</Provider>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept();
}