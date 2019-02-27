import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { history } from './redux/helpers';
// import { BrowserRouter as Router } from 'react-router-dom'
import { Router } from 'react-router-dom';
import xhr from './helpers/header';
// xhr();

render(
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