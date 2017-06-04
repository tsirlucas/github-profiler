import {bind} from 'decko';
import {Component, h} from 'preact';
import {Router} from 'preact-router';
import createHistory from 'history/createHashHistory';

import {store} from './store';
import Home from './pages/home/Home';
import User from './pages/user/User';
import Repos from './pages/repos/Repos';
import Notes from './pages/notes/Notes';
import Template from './commons/Template';
import SnackBar from './commons/SnackBar';
import {dispatchChangeRoute} from './core/router/router.service';

export const history = createHistory();

export default class Routes extends Component {
	@bind
	onEnter() {
		const nextURL = store.getState().route.path;
		const currURL = window.location.hash.slice(1);
		if (currURL !== nextURL) {
			dispatchChangeRoute(currURL);
		}
	}

	@bind
	syncState(store) {
		const nextURL = store.getState().route.path;
		if (this.state.currentURL !== nextURL) {
			this.setState({currentURL: nextURL});
			history.push(nextURL);
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillMount() {
		this.onEnter();
		this.unsubscribe = store.subscribe(() => this.syncState(store));
		this.unlisten = history.listen(() => this.onEnter());
	}

	componentDidUnmount() {
		this.unsubscribe();
		this.unlisten();
	}

	render() {
		return (
			<div>
				<Template/>
				<Router history={history}>
					<Home path="/"/>
					<User path="/user"/>
					<Repos path="/repos"/>
					<Notes path="/notes"/>
				</Router>
				<SnackBar/>
			</div>
		);
	}
}

