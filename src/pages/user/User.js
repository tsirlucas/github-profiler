import {h, Component} from 'preact';
import pureSubscribe from 'redux-pure-subscribe';

import {store} from '../../index';
import Avatar from './components/Avatar';
import NoUser from '../../commons/NoUser';
import pure from '../../util/pureComponent';
import UserInfo from './components/UserInfo';

@pure()
export default class User extends Component {
	state = {
		user: {}
	};

	syncState = ({user}) => this.setState({user});

	componentDidMount() {
		this.unsubscribe = pureSubscribe(store, this.syncState, 'user');
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render(props, {user}) {
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
