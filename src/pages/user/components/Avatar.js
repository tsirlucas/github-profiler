import {h} from 'preact';

export default ({user}) => (
	<div className="avatar-container">
		<img src={user.avatar_url} alt="avatar" style="border-rounded: 50%"/>
		<h3>{user.login}</h3>
	</div>
);
