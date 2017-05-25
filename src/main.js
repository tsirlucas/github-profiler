import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'preact-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers';
import Routes from './routes';

require('./style/import.scss');

injectTapEventPlugin();

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#App')
);
