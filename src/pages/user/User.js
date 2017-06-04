import {h, Component} from 'preact';

import Avatar from './components/Avatar';
import NoUser from '../../commons/NoUser';
import {getCurrentState} from '../../store';
import UserInfo from './components/UserInfo';

export default class User extends Component {
	componentDidMount() {
		const store = this.context.store;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const {user} = getCurrentState();

		const userLabels = {
			name: 'Name',
			email: 'Email',
			location: 'Location',
			company: 'Company',
			followers: 'Followers',
			following: 'Following',
			public_repos: 'Public repos',
			blog: 'Blog'
		};

		return (
			user.login ?
				<div id="user">
					<Avatar user={user}/>
					<UserInfo user={user} userLabels={userLabels}/>
				</div> : <NoUser />
		);
	}
}
