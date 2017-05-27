import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bind} from 'decko';
import {List, ListItem, Button, Icon} from 'preact-mdl';

import {addNoteAction, removeNoteAction, editNoteAction, listNotesAction} from '../../core/notes/notes.actions';
import {isUserDefined} from '../../core/user/user.helper';
import reducers from '../../reducers';
import bindActions from '../../util/bindActions';
import {getCurrentState, store} from '../../store';

@connect(reducers, bindActions({addNoteAction, removeNoteAction, editNoteAction, listNotesAction}))
export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };
    }

    componentWillMount() {
        let {user} = getCurrentState();
        store.dispatch(listNotesAction(user.login))
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
            store.dispatch(addNoteAction(this.state.userInput, user.login.toLowerCase()));
            this.setState({userInput: ''})
        }
    };

    @bind
    removeNoteHandler(note) {
        const {user} = getCurrentState();
        if (isUserDefined()) {
            store.dispatch(removeNoteAction(note, user.login.toLowerCase()));
        }
    };

    @bind
    editNoteHandler(note, text) {
        if (isUserDefined()) {
            store.dispatch(editNoteAction(note, text, user.login));
        }
    };

    render({notes}, {userInput}) {
        let {user} = getCurrentState();
        return (
            <div id='notes'>
                <div className='notes-list'>
                    <List>
                        {notes.map((note) => {
                            return <ListItem>
                                <div className='note-item'>
                                    <h5>{note.text}</h5>
                                    <Icon icon='close' onClick={(e) => this.removeNoteHandler(note)}/>
                                </div>
                            </ListItem>
                        })}
                    </List>
                </div>
                <div className='center-align'>
                    <NotesForm addNoteHandler={this.addNoteHandler} handleUpdateInput={this.handleUpdateInput}
                               userInput={userInput} user={user}/>
                </div>
            </div>
        )
    }
}

const NotesForm = ({handleUpdateInput, addNoteHandler, userInput, user}) => (
    <form onSubmit={addNoteHandler}>
        <input className='notes-input' onInput={handleUpdateInput} value={userInput}
               disabled={!isUserDefined()} placeholder='Type your note'/>
        <Button label='Add' type="submit"
                disabled={!isUserDefined() || userInput.trim().length <= 0}>Add</Button>
    </form>
);
