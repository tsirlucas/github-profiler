import {h, Component} from 'preact';
import {List, ListItem, Button} from 'preact-mdl';
import {addNoteAction, removeNoteAction, editNoteAction, listNotesAction} from '../../core/notes/notes.actions';
import {isUserDefined} from '../../core/user/user.helper';
import is from 'is_js';

import {connect} from 'preact-redux';
import reducers from '../../reducers';
import bindActions from '../../util/bindActions';
import {bind} from 'decko';
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
        let {user} = getCurrentState();
        if (isUserDefined() && this.state.userInput.trim().length > 0) {
            store.dispatch(addNoteAction(this.state.userInput, user.login.toLowerCase()));
            this.setState({userInput: ''})
        }
    };

    @bind
    removeNoteHandler(e, note) {
        e.stopPropagation();
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
                <List className="notes-list">
                    {notes.map((note) => {
                        return <ListItem
                            // rightIconButton={
                            //   <IconButton onClick={(e) => removeNoteHandler(e, note)} iconClassName='fa fa-times'/>
                            // }
                        >
                            <h5>{note.text}</h5>
                        </ListItem>
                    })}
                </List>
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
        <input id='user-input' onInput={handleUpdateInput} value={userInput}
               disabled={!isUserDefined()}/>
        <Button label='Add' type="submit"
                disabled={!isUserDefined() || userInput.trim().length <= 0}/>
    </form>
);
