import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bind} from 'decko';

import {addNote, removeNote, editNote, listNotes} from '../../core/notes/notes.actions';
import {isUserDefined} from '../../core/user/user.helper';
import reducers from '../../reducers';
import bindActions from '../../util/bindActions';
import {getCurrentState, store} from '../../store';
import NoUser from '../../commons/NoUser';
import CloseIcon from '../../commons/CloseIcon';

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
        this.props.listNotes(user.login)
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
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
            this.setState({userInput: ''})
        }
    };

    @bind
    removeNoteHandler(note) {
        const {user} = getCurrentState();
        if (isUserDefined()) {
            this.props.removeNote(note, user.login.toLowerCase());
        }
    };

    @bind
    editNoteHandler(note, text) {
        if (isUserDefined()) {
            this.props.editNote(note, text, user.login);
        }
    };

    render({notes}, {userInput}) {
        let {user} = getCurrentState();
        return (user.login ?
                <div id='notes'>
                    <div className='notes-list'>
                        <ul className="mdl-list repos-list">
                            {notes.map((note) => {
                                return <li className='mdl-list__item'>
                                    <div className='note-item'>
                                        <h5>{note.text}</h5>
                                        <a onClick={(e) => this.removeNoteHandler(note)}><CloseIcon/></a>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className='center-align'>
                        <NotesForm addNoteHandler={this.addNoteHandler} handleUpdateInput={this.handleUpdateInput}
                                   userInput={userInput} user={user}/>
                    </div>
                </div> : <NoUser/>
        )
    }
}

const NotesForm = ({handleUpdateInput, addNoteHandler, userInput, user}) => (
    <form onSubmit={addNoteHandler}>
        <input className='notes-input' type="text" onInput={handleUpdateInput} value={userInput}
               disabled={!isUserDefined()} placeholder='Type your note' aria-label='add-note'/>
        <button label='Add' type="submit" disabled={!isUserDefined() || userInput.trim().length <= 0}
                class={`mdl-button mdl-js-ripple-effect mdl-js-button ${!isUserDefined() || userInput.trim().length <= 0 ? 'mdl-button--disabled' : null}`}>
            Add
        </button>
    </form>
);
