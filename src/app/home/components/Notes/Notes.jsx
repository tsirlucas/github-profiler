import React from 'react';
import {Card, CardHeader, List, ListItem, TextField, FlatButton, Snackbar} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import {addNoteAction, removeNoteAction, editNoteAction, listNotes} from './NotesActions.js';
import is from 'is_js';

export default class Notes extends React.Component {
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

    render() {
        let store = this.context.store;
        let state = store.getState();
        let user = state.UserReducer.data.user.login;
        const handleUpdateInput = (ev, text) => this.userInput = text;
        const addNoteHandler = () => {
            if (is.not.undefined(user) && is.not.empty(user)) {
                store.dispatch(addNoteAction(this.userInput, user.toLowerCase()));
            }
        };
        const removeNoteHandler = (note) => {
            if (is.not.undefined(user) && is.not.empty(user)) {
                store.dispatch(removeNoteAction(note, user.toLowerCase()));
            }
        };
        const editNoteHandler = (note, text) => {
            if (is.not.undefined(user) && is.not.empty(user)) {
                store.dispatch(editNoteAction(note, text, user));
            }
        };

        return <div className='col s12 m12 l4'>
            <NotesTemplate
                notes={state.NotesReducer.notes}
                addNoteHandler={addNoteHandler}
                removeNoteHandler={removeNoteHandler}
                handleUpdateInput={handleUpdateInput}
                editNoteHandler={editNoteHandler}
                invalidUsername={!user}
            />
        </div>
    }
}

Notes.contextTypes = {
    store: React.PropTypes.object
};

const NotesTemplate = ({notes, addNoteHandler, handleUpdateInput, removeNoteHandler, editNoteHandler, invalidUsername}) => (
    <Card>
        <CardHeader title='Notes'
                    subtitle='Click on item to edit'
        />
        <List>
            {notes.map((note) => {
                return <ListItem
                    key={notes.indexOf(note)}
                    rightIconButton={<RemoveButton removeNoteHandler={removeNoteHandler} note={note}/>}
                    secondaryText={<span>{note.text}</span>}
                    primaryTogglesNestedList={true}
                    secondaryTextLines={2}
                    nestedItems={[
                        <ListItem style={{marginLeft: '30px'}}
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
            <NotesForm addNoteHandler={addNoteHandler} handleUpdateInput={handleUpdateInput} invalidUsername={invalidUsername} />
        </div>
    </Card>
);

const NotesForm = ({handleUpdateInput, addNoteHandler, invalidUsername}) => (
    <div>
        <TextField id='user-input' onChange={handleUpdateInput}/>
        <FlatButton label='Add' onClick={addNoteHandler}/>
        <Snackbar
            open={invalidUsername}
            message="INVALID USERNAME!"
            autoHideDuration={3000}
        />
    </div>
);

const EditForm = ({editNoteHandler, note}) => (
    <TextField id='user-input' onChange={(ev, text) => editNoteHandler(note, text)}/>
);

const RemoveButton = ({removeNoteHandler, note}) => (
    <Delete onClick={() => removeNoteHandler(note)} style={{float: 'right'}}/>
);