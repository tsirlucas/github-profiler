import {h, Component} from 'preact';

import Header from './components/Header';
import HeaderTab from './components/HeaderTab';
import HeaderTabs from './components/HeaderTabs';
import HeaderTitle from './components/HeaderTitle';

export default class Navbar extends Component {
	render() {
		return (
			<Header>
				<HeaderTitle/>
				<HeaderTabs>
					<HeaderTab path='/github-profiler/' label='HOME'/>
					<HeaderTab path='/github-profiler/user' label='USER'/>
					<HeaderTab path='/github-profiler/repos' label='REPOS'/>
					<HeaderTab path='/github-profiler/notes' label='NOTES'/>
				</HeaderTabs>
			</Header>
		);
	}
}
