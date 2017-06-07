import {h, Component} from 'preact';

import bind from '../../util/bind';
import {store} from '../../index';
import NoUser from '../../commons/NoUser';
import NotesForm from './components/NotesForm';
import {getCurrentState} from '../../store';
import NotesList from '../../commons/components/List';
import NotesItem from '../../commons/components/ListItem';
import {isUserDefined} from '../../core/user/user.helper';
import {addNote, removeNote, editNote, listNotes} from '../../core/notes/notes.actions';

export default class Notes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: '',
			notes: {content: []}
		};
	}

	componentWillMount() {
		let {user} = getCurrentState();
		if (user.login) {
			store.dispatch(listNotes(user.login));
		}
	}

	componentDidMount() {
		this.syncState(store);
		this.unsubscribe = store.subscribe(() => this.syncState(store));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	@bind
	syncState({getState}) {
		const {notes} = getState();
		this.setState({notes})
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
			store.dispatch(addNote(this.state.userInput, user.login.toLowerCase()));
			this.setState({userInput: ''});
		}
	}

	@bind
	removeNoteHandler(note) {
		const {user} = getCurrentState();
		if (isUserDefined()) {
			store.dispatch(removeNote(note, user.login.toLowerCase()));
		}
	}

	@bind
	editNoteHandler(note, text) {
		const {user} = getCurrentState();
		if (isUserDefined()) {
			store.dispatch(editNote(note, text, user.login));
		}
	}

	render(props, {userInput, notes}) {
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
