import Template from '../../src/app/Template.js';
import Home from '../home/Home.js';
import Bonus from '../bonus/Bonus.js';
import React from 'react';
import {Router, browserHistory} from 'react-router';

const routes = {
    path: '/',
    component: Template,
    indexRoute: {component: Home},
    childRoutes: [
        {component: Bonus, path: '/bonus'}
    ]
};

export default class Routes extends React.Component {
    render() {
        return <Router history={browserHistory} routes={routes}/>;
    }
}