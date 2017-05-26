import {render, h} from 'preact';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Routes from './routes';
import 'material-design-lite/material';

import './style/import.scss';

const store = createStore(reducers, applyMiddleware(thunk));

render(
  <Provider store={store}>
      <Routes />
  </Provider>,
  document.querySelector('#App')
);
