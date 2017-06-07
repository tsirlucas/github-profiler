import {render, h} from 'preact';

import {store as currentStore} from './store';
import Routes from './routes';
import initSW from './util/initSW';

import './style/import.scss';

export const store = currentStore;

const init = () => {
	document.querySelector('#App').removeChild(document.querySelector('h3'));
	render(
			<Routes store={store} />,
		document.querySelector('#App')
	);
};

initSW();
init();

