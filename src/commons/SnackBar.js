import {h, Component} from 'preact';
import pureSubscribe from 'redux-pure-subscribe';

import {store} from '../store';
import pure from '../util/pureComponent';
import {clearSnackBar} from '../core/snackbar/snackbar.actions';

@pure()
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

			store.dispatch(clearSnackBar());
		}, 200);
		this.timeout = setTimeout(() => this.setState({showSnackBar: false}), timer);
	}

	syncState = ({snackbar}) => {
		const {text} = snackbar;

		if (text) {
			this.popSnackBar(text);
		}
	};

	componentWillMount() {
		this.unsubscribe = pureSubscribe(store, this.syncState, 'snackbar');
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
