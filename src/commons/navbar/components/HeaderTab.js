import {h} from 'preact';
import {Link} from 'preact-router/match';

export default ({path, label}) => (
	<Link
		activeClassName='is-active'
		className='tab'
		href={path}
		rel='noopener'
		name={label.toLowerCase()}
	>{label}</Link>
);
