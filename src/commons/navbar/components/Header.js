import {h} from 'preact';

export default ({children}) => (
	<div className="navbar-container">
		<div
			fixed-header="true"
			className="navbar"
		>
			<header className="header">
				<div className="header-row">
					{children}
				</div>
			</header >
		</div >
	</div >
);
