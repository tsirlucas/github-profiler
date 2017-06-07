import {h, Component} from 'preact';

import {store} from '../../index';
import NoUser from '../../commons/NoUser';
import {getCurrentState} from '../../store';
import ReposList from '../../commons/components/List';
import ReposItem from '../../commons/components/ListItem';

export default class Repos extends Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
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
