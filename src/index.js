import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import Root from './components/Root';


render(
	// <Root store={store} />, document.getElementById('root')
	<App />, document.getElementById('root')
)

if (module.hot) {
	module.hot.accept();
}