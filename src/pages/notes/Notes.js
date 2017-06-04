import {bind} from 'decko';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';

import reducers from '../../reducers';
import NoUser from '../../commons/NoUser';
import NotesForm from './components/NotesForm';
import bindActions from '../../util/bindActions';
import {getCurrentState, store} from '../../store';
import NotesList from '../../commons/components/List';
import NotesItem from '../../commons/components/ListItem';
import {isUserDefined} from '../../core/user/user.helper';
import {addNote, removeNote, editNote, listNotes} from '../../core/notes/notes.actions';

@connect(reducers, bindActions({addNote, removeNote, editNote, listNotes}))
export default class Notes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: ''
		};
	}

	componentWillMount() {
		let {user} = getCurrentState();
		if (user.login) {
			this.props.listNotes(user.login);
		}
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	@bind
	handleUpdateInput(ev) {
		this.setState({userInput: ev.target.value});
	}

	@bind
	addNoteHandler(e) {
		e.preventDefault();
		const {user} = getCurrentState();
		if (isUserDefined() && this.state.userInput.trim().length > 0) {
			this.props.addNote(this.state.userInput, user.login.toLowerCase());
			this.setState({userInput: ''});
		}
	}

	@bind
	removeNoteHandler(note) {
		const {user} = getCurrentState();
		if (isUserDefined()) {
			this.props.removeNote(note, user.login.toLowerCase());
		}
	}

	@bind
	editNoteHandler(note, text) {
		const {user} = getCurrentState();
		if (isUserDefined()) {
			this.props.editNote(note, text, user.login);
		}
	}

	render({notes}, {userInput}) {
		let {user} = getCurrentState();
		return (user.login ?
				<div id='notes'>
					<NotesList>
						{notes.content.map((note) =>
							<NotesItem title={note.text} note={note} removeHandler={this.removeNoteHandler}/>
						)}
					</NotesList>
					<NotesForm addNoteHandler={this.addNoteHandler} handleUpdateInput={this.handleUpdateInput}
										 userInput={userInput} user={user} sending={notes.sending}/>
				</div> : <NoUser/>
		);
	}
}
