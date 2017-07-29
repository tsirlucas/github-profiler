import {Component, h} from 'preact';
import pureSubscribe from 'redux-pure-subscribe';

import {store} from '../../index';
import Icon from '../../commons/Icon';
import pure from '../../util/pureComponent';
import {searchUser as searchUserAction} from '../../core/user/user.actions';

@pure()
export default class Home extends Component {

	state = {
		user: {
			loading: false
		},
		userInput: ''
	};

	syncState = ({user}) => this.setState({user});

	componentDidMount() {
		this.setState({userInput: ''});
		this.unsubscribe = pureSubscribe(store, this.syncState, 'user');
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	updateSearchText = (e) => {
		this.setState({userInput: e.target.value.toLowerCase()});
	};

	searchUser = (e) => {
		e.preventDefault();
		if (this.state.userInput.length > 0 && this.state.userInput && this.state.userInput.trim().length > 0) {
			store.dispatch(searchUserAction(this.state.userInput));
			this.state.userInput = '';
		}
	};

	render(props, {user, userInput}) {
		return (
			<div id='home'>
				<form id='search-user' onSubmit={this.searchUser}>
					<input href='/github-profiler/' id='user-input' type="text" onInput={this.updateSearchText}
								 placeholder='Username'
								 value={userInput} aria-label='username'/>
					<button href='/github-profiler/'
									class={`mdl-button mdl-js-ripple-effect mdl-js-button ${userInput.trim().length <= 0 ? 'mdl-button--disabled' : ''}`}
									type='submit' disabled={userInput.trim().length <= 0}>{user.loading ?
						<Icon icon='sync' color='white' className='icon-spinner'/> : 'Search'}
					</button>
				</form>
				'
			</div>
		);
	}
}
