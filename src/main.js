import {render, h} from 'preact';
import { Provider } from 'preact-redux';
import {store} from './store';

import Routes from './routes';
import 'material-design-lite/material';

import './style/import.scss';

render(
  <Provider store={store}>
      <Routes />
  </Provider>,
  document.querySelector('#App')
);
