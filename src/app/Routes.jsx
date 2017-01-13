import Template from './commons/Template.jsx';
import Home from './home/Home.jsx';
import Bonus from './bonus/Bonus.jsx';
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