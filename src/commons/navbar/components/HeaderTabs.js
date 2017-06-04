import {h} from 'preact';

export default ({children}) => (
	<section className="mdl-layout__tab-panel">
		<div className="page-content">
			{children}
		</div>
	</section>
);
