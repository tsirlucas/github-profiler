import {h, Component} from 'preact';
import {bind} from 'decko';

import {store} from '../../store';
import Header from './components/Header';
import HeaderTab from './components/HeaderTab';
import HeaderTabs from './components/HeaderTabs';
import HeaderTitle from './components/HeaderTitle';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	@bind
	syncState({getState}) {
		const {route, user} = getState();
		this.setState({path: route.path, user: user.login});
	}

	componentWillMount() {
		this.syncState(store);
		this.unsubscribe = store.subscribe(() => this.syncState(store));
	}

	componentDidUnmount() {
		this.unsubscribe();
	}

	render(props, {path}) {
		return (
			<Header>
				<HeaderTitle/>
				<HeaderTabs>
					<HeaderTab path='/' currentPath={path} label='HOME'/>
					<HeaderTab path='/user' currentPath={path} label='USER'/>
					<HeaderTab path='/repos' currentPath={path} label='REPOS'/>
					<HeaderTab path='/notes' currentPath={path} label='NOTES'/>
				</HeaderTabs>
			</Header>
		);
	}
}
