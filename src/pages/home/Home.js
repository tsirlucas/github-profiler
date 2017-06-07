import {Component, h} from 'preact';

import {store} from '../../index';
import bind from '../../util/bind';
import Icon from '../../commons/Icon';
import {searchUser} from '../../core/user/user.actions';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loading: false
			},
			userInput: ''
		};
	}

	@bind
	syncState({getState}) {
		const {user} = getState();
		this.setState({user});
	}

	componentDidMount() {
		this.setState({userInput: ''});
		this.syncState(store);
		this.unsubscribe = store.subscribe(() => this.syncState(store));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	@bind
	updateSearchText(e) {
		this.setState({userInput: e.target.value.toLowerCase()});
	}

	@bind
	searchUser(e) {
		e.preventDefault();
		if (this.state.userInput.length > 0 && this.state.userInput && this.state.userInput.trim().length > 0) {
			store.dispatch(searchUser(this.state.userInput));
			this.state.userInput = '';
		}
	}

	render(props, {user, userInput}) {
		return (
			<div id='home'>
				<form id='search-user' onSubmit={this.searchUser}>
					<input href='/github-profiler/' id='user-input' type="text" onInput={this.updateSearchText} placeholder='Username'
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
