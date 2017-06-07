import {h} from 'preact';
import {Link} from 'preact-router/match';

export default ({path, label}) => (
	<Link
		activeClassName='mdl-layout__tab--active is-active'
		className='mdl-layout__tab'
		href={path}
		rel='noopener'
		name={label.toLowerCase()}
	>{label}</Link>
);
