import {Component, h} from 'preact';
import {Router} from 'preact-router';

import Home from './pages/home/Home';
import User from './pages/user/User';
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
					<Home default store={store} path="/github-profiler/"/>
					<User store={store} path="/github-profiler/user"/>
					<Repos store={store} path="/github-profiler/repos"/>
					<Notes store={store} path="/github-profiler/notes"/>
				</Router>
				<SnackBar/>
			</div>
		);
	}
}

