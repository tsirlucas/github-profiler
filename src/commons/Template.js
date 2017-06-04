import {h} from 'preact';

import Navbar from './navbar/Navbar';

export default ({children}) => (
	<div className="template">
		<Navbar />
		{children}
	</div>
);

