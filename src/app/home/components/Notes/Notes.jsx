import React from 'react';
import {Card, CardHeader, List, ListItem, TextField, FlatButton, Snackbar, IconButton} from 'material-ui';
import {addNoteAction, removeNoteAction, editNoteAction, listNotes} from './NotesActions.js';
import is from 'is_js';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };

        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.addNoteHandler = this.addNoteHandler.bind(this);
        this.removeNoteHandler = this.removeNoteHandler.bind(this);
        this.editNoteHandler = this.editNoteHandler.bind(this);
    }

    componentWillMount() {
        let store = this.context.store;
        let user = store.getState().UserReducer.data.user.login;
        store.dispatch(listNotes(user))
    }

    componentDidMount() {
        let store = this.context.store;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleUpdateInput(ev, text) {
        this.setState({userInput: text});
    }

    addNoteHandler(e) {
        e.preventDefault();
        let store = this.context.store;
        let state = store.getState();
        let user = state.UserReducer.data.user.login;
        if (is.not.undefined(user) && is.not.empty(user) && this.state.userInput.trim().length > 0) {
            store.dispatch(addNoteAction(this.state.userInput, user.toLowerCase()));
            this.setState({userInput: ''})
        }
    };

    removeNoteHandler(e, note) {
        e.stopPropagation();
        let store = this.context.store;
        let state = store.getState();
        let user = state.UserReducer.data.user.login;
        if (is.not.undefined(user) && is.not.empty(user)) {
            store.dispatch(removeNoteAction(note, user.toLowerCase()));
        }
    };

    editNoteHandler(note, text) {
        let store = this.context.store;
        let state = store.getState();
        let user = state.UserReducer.data.user.login;
        if (is.not.undefined(user) && is.not.empty(user)) {
            store.dispatch(editNoteAction(note, text, user));
        }
    };

    render() {
        let store = this.context.store;
        let state = store.getState();
        let user = state.UserReducer.data.user.login;

        return <div className='col s12 m12 l4'>
            <NotesTemplate
                notes={state.NotesReducer.notes}
                addNoteHandler={this.addNoteHandler}
                removeNoteHandler={this.removeNoteHandler}
                handleUpdateInput={this.handleUpdateInput}
                editNoteHandler={this.editNoteHandler}
                invalidUsername={!user}
                user={user}
                userInput={this.state.userInput}
            />
        </div>
    }
}

Notes.contextTypes = {
    store: React.PropTypes.object
};

const NotesTemplate = ({notes, addNoteHandler, handleUpdateInput, removeNoteHandler, editNoteHandler, invalidUsername, userInput, user}) => (
    <Card>
        <CardHeader title='Notes'
                    subtitle='Click on item to edit'
        />
        <List>
            {notes.map((note) => {
                return <ListItem
                    key={notes.indexOf(note)}
                    rightIconButton={
                        <IconButton onClick={(e) => removeNoteHandler(e, note)} iconClassName='fa fa-times'/>
                    }
                    secondaryText={<span>{note.text}</span>}
                    primaryTogglesNestedList={true}
                    secondaryTextLines={2}
                    nestedItems={[
                        <ListItem className="notes-item"
                                  hoverColor='white'
                                  key={1}
                                  value={2}
                                  children={[<EditForm editNoteHandler={editNoteHandler} note={note}/>]}
                        />,
                    ]}
                />
            })}
        </List>
        <div className='center-align'>
            <NotesForm addNoteHandler={addNoteHandler} handleUpdateInput={handleUpdateInput}
                       invalidUsername={invalidUsername} userInput={userInput} user={user}/>
        </div>
    </Card>
);

const NotesForm = ({handleUpdateInput, addNoteHandler, invalidUsername, userInput, user}) => (
    <form onSubmit={addNoteHandler}>
        <TextField id='user-input' onChange={handleUpdateInput} value={userInput} disabled={invalidUsername || user === true}/>
        <FlatButton label='Add' onClick={addNoteHandler} disabled={invalidUsername || user === true || userInput.trim().length <= 0}/>
        <Snackbar
            open={invalidUsername}
            message="INVALID USERNAME!"
            autoHideDuration={3000}
        />
    </form>
);

const EditForm = ({editNoteHandler, note}) => (
    <TextField id='user-input' onChange={(ev, text) => editNoteHandler(note, text)}/>
);
