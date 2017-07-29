import {h, Component} from 'preact';
import pureSubscribe from 'redux-pure-subscribe';

import {store} from '../../index';
import NoUser from '../../commons/NoUser';
import {getCurrentState} from '../../store';
import pure from '../../util/pureComponent';
import ReposList from '../../commons/components/List';
import ReposItem from '../../commons/components/ListItem';

@pure()
export default class Repos extends Component {
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
		const {repos, login} = getCurrentState().user;

		return (login ?
				<div id="repos">
					<ReposList>
						{repos.map(repo =>
							(<ReposItem
								title={repo.name} description={repo.description}
								onClick={() => window.open(repo.html_url, '_blank')}
							/>)
						)}
					</ReposList>
				</div> : <NoUser />
		);
	}
}
