import Template from './commons/Template';
import Home from './pages/home/Home';
import User from './pages/user/User';
import Repos from './pages/repos/Repos';
import Notes from './pages/notes/Notes';
import React from 'react';
import {Router, browserHistory} from 'react-router';

const routes = {
    path: '/',
    component: Template,
    indexRoute: {component: Home},
    childRoutes: [
        {component: User, path: '/user'},
        {component: Repos, path: '/repos'},
        {component: Notes, path: '/notes'}
    ]
};

export default class Routes extends React.Component {
    render() {
        return <Router history={browserHistory} routes={routes}/>;
    }
}
