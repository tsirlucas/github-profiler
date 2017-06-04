import {render, h} from 'preact';
import {Provider} from 'preact-redux';

import {store} from './store';
import Routes from './routes';
import initSW from './util/initSW';

import './style/import.scss';

const init = () => {
	document.querySelector('#App').removeChild(document.querySelector('h3'));
	render(
		<Provider store={store}>
			<Routes />
		</Provider>,
		document.querySelector('#App')
	);
};

initSW();
init();

