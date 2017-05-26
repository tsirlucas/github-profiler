import {h, Component} from 'preact';
import {List, ListItem, Button} from 'preact-mdl';
import {addNoteAction, removeNoteAction, editNoteAction, listNotesAction} from './NotesActions';
import is from 'is_js';

import {connect} from 'preact-redux';
import reducers from '../../reducers';
import bindActions from '../../util/bindActions';
import {bind} from 'decko';

@connect(reducers, bindActions({addNoteAction, removeNoteAction, editNoteAction, listNotesAction}))
export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
  }

  componentWillMount() {
    let store = this.context.store;
    let user = store.getState().UserReducer.data.user.login;
    store.dispatch(listNotesAction(user))
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

  @bind
  handleUpdateInput(ev) {
    this.setState({userInput: ev.target.value});
  }

  @bind
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

  @bind
  removeNoteHandler(e, note) {
    e.stopPropagation();
    let store = this.context.store;
    let state = store.getState();
    let user = state.UserReducer.data.user.login;
    if (is.not.undefined(user) && is.not.empty(user)) {
      store.dispatch(removeNoteAction(note, user.toLowerCase()));
    }
  };

  @bind
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

const NotesTemplate = ({notes, addNoteHandler, handleUpdateInput, removeNoteHandler, editNoteHandler, invalidUsername, userInput, user}) => (
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
      <NotesForm addNoteHandler={addNoteHandler} handleUpdateInput={handleUpdateInput}
                 invalidUsername={invalidUsername} userInput={userInput} user={user}/>
    </div>
  </div>
);

const NotesForm = ({handleUpdateInput, addNoteHandler, invalidUsername, userInput, user}) => (
  <form onSubmit={addNoteHandler}>
    <input id='user-input' onInput={handleUpdateInput} value={userInput}
           disabled={invalidUsername || user === true}/>
    <Button label='Add' onClick={addNoteHandler}
                disabled={invalidUsername || user === true || userInput.trim().length <= 0}/>
  </form>
);
