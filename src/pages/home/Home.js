import {Component, h} from 'preact';
import {bind} from 'decko';
import {Button} from 'preact-mdl';
import is from 'is_js';
import {connect} from 'preact-redux';

import reducers from '../../reducers';
import bindActions from '../../util/bindActions';
import searchUserAction from '../../core/user/user.actions';
import {listNotesAction} from '../../core/notes/notes.actions'

@connect(reducers, bindActions({searchUserAction, listNotesAction}))
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };
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
    updateSearchText(e) {
        this.setState({userInput: e.target.value.toLowerCase()});
    }

    @bind
    searchUser(e) {
        e.preventDefault();
        let store = this.context.store;
        if (is.not.empty(this.state.userInput) && is.not.undefined(this.state.userInput) && this.state.userInput.trim().length > 0) {
            store.dispatch(searchUserAction(this.state.userInput));
            store.dispatch(listNotesAction(this.state.userInput));
            this.state.userInput = '';
        }
    }

    render() {
        return (
            <div id='home'>
                <form id='search-user' onSubmit={this.searchUser}>
                    <input id='user-input' onInput={this.updateSearchText} placeholder='Username' aria-label='username'/>
                    <Button type='submit' disabled={this.state.userInput.trim().length <= 0}>Search</Button>
                </form>
            </div>
        )
    }
}
