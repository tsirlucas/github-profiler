import {h, Component} from 'preact';
import {connect} from 'preact-redux';

import reducers from '../reducers';
import bindActions from '../util/bindActions';
import {clearSnackBar} from '../core/snackbar/snackbar.actions';

@connect(reducers, bindActions({clearSnackBar}))
export default class SnackBar extends Component {

	state = {
		showSnackBar: false,
		timer: 5000,
		actionText: 'Ok',
		snackBarText: ''
	};

	popSnackBar(text) {
		this.setState({showSnackBar: false});
		clearTimeout(this.timeout);
		const {timer} = this.state;

		setTimeout(() => {
			this.setState({
				showSnackBar: true,
				snackBarText: text
			});

			this.props.clearSnackBar();
		}, 200);
		this.timeout = setTimeout(() => this.setState({showSnackBar: false}), timer);
	}

	syncState({getState}) {
		const {snackbar} = getState();
		const {text} = snackbar;

		if (text) {
			this.popSnackBar(text)
		}
	}

	componentWillMount() {
		let store = this.context.store;
		this.unsubscribe = store.subscribe(() => this.syncState(store));
	}

	componentDidUnmount() {
		this.unsubscribe();
	}

	hideSnackbar = () => this.setState({showSnackBar: false});

	render(props, {showSnackBar, actionText, snackBarText}) {
		return (
			<div className='snackbar' style={`bottom: ${showSnackBar ? 0 : '-50px'}`}>
				<p className='snackbar-text'>{snackBarText}</p>
				<button className='snackbar-button' onClick={this.hideSnackbar}>{actionText}</button>
			</div>
		);
	}
}
