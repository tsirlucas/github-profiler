import {h} from 'preact';

import Icon from '../Icon';

export default ({title, note, description, removeHandler, onClick}) => (
	<li className="list-item">
		<div className="pinned-list-item" onClick={onClick}>
			<h5>{title || note.text}</h5>
			{description ? <p>{description}</p> : null}
			{removeHandler ? <a onClick={() => removeHandler(note)}>
				<Icon
					icon={note.removing ? 'sync' : 'remove'}
					className={note.removing ? 'icon-spinner' : ''}
					color="black"
				/>
			</a> : null}
		</div>
	</li>
);
