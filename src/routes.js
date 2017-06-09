import {Component, h} from 'preact';
import {Router} from 'preact-router';

import Home from './pages/home/Home';
import User from './pages/user/User';
import baseUrl from './util/baseUrl';
import Repos from './pages/repos/Repos';
import Notes from './pages/notes/Notes';
import Template from './commons/Template';
import SnackBar from './commons/SnackBar';

export default class Routes extends Component {
	render({store}) {
		return (
			<div>
				<Template/>
				<Router>
					<Home default store={store} path={baseUrl + '/'}/>
					<User store={store} path={baseUrl + '/user'}/>
					<Repos store={store} path={baseUrl + '/repos'}/>
					<Notes store={store} path={baseUrl + '/notes'}/>
				</Router>
				<SnackBar/>
			</div>
		);
	}
}

