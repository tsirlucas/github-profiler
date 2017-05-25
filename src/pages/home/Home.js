import React from 'react';
import {TextField, FlatButton} from 'material-ui';
import searchUserAction from '../user/UserActions';
import {listNotesAction} from '../notes/NotesActions'
import is from 'is_js';
import {browserHistory} from 'react-router';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };

        this.updateSearchText = this.updateSearchText.bind(this);
        this.searchUser = this.searchUser.bind(this);
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

    updateSearchText(e, text) {
        this.setState({userInput: text.toLowerCase()});
    }

    searchUser(e) {
        e.preventDefault();
        let store = this.context.store;
        if (is.not.empty(this.state.userInput) && is.not.undefined(this.state.userInput) && this.state.userInput.trim().length > 0) {
            store.dispatch(searchUserAction(this.state.userInput));
            store.dispatch(listNotesAction(this.state.userInput));
            browserHistory.push('/user');
            this.state.userInput = '';
        }
    }

    render() {
        return (
            <div id='home'>
                <form onSubmit={this.searchUser}>
                    <TextField id='user-input' onChange={this.updateSearchText} value={this.state.userInput}/>
                    <FlatButton label='Search' onClick={this.searchUser} disabled={this.state.userInput.trim().length <= 0}/>
                </form>
            </div>
        )
    }
}
