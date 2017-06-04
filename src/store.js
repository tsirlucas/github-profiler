import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import {epics} from './epics';
import reducers from './reducers';

export const store = createStore(reducers, applyMiddleware(createEpicMiddleware(epics)));

export const getCurrentState = () => store.getState();
