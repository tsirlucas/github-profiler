import {h} from 'preact';

import baseUrl from '../../util/baseUrl';
import Header from './components/Header';
import HeaderTab from './components/HeaderTab';
import HeaderTabs from './components/HeaderTabs';
import HeaderTitle from './components/HeaderTitle';

const Navbar = () => (
	<Header>
		<HeaderTitle/>
		<HeaderTabs>
			<HeaderTab path={baseUrl + '/'} label='HOME'/>
			<HeaderTab path={baseUrl + '/user'} label='USER'/>
			<HeaderTab path={baseUrl + '/repos'} label='REPOS'/>
			<HeaderTab path={baseUrl + '/notes'} label='NOTES'/>
		</HeaderTabs>
	</Header>
);

export default Navbar
