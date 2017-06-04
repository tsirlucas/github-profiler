import {h} from 'preact';

export default ({user, userLabels}) => (
	<ul className="collection">
		{Object.keys(userLabels).map((key, index) => (
			<li className="collection-item" key={index}>
				<div>{userLabels[key]}: <span className="grey-text">{user[key] || 'Not available'}</span></div>
			</li>
		))}
	</ul>
);
