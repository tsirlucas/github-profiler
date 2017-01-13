import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers.jsx';
import thunk from 'redux-thunk';
import Routes from './Routes.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require('../style/import.scss');

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