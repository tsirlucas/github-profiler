import {Component, h} from 'preact';
import {bind} from 'decko';
import is from 'is_js';
import {connect} from 'preact-redux';

import reducers from '../../reducers';
import Icon from '../../commons/Icon';
import bindActions from '../../util/bindActions';
import {searchUser} from '../../core/user/user.actions';
import {listNotesAction} from '../../core/notes/notes.actions'

@connect(reducers, bindActions({searchUser, listNotesAction}))
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                loading: false
            },
            userInput: ''
        };
    }

    @bind
    syncState({getState}) {
        const {user} = getState();
        this.setState({user})
    }

    componentDidMount() {
        this.setState({userInput: ''});
        let {store} = this.context;
        this.syncState(store);
        this.unsubscribe = store.subscribe(() => this.syncState(store));
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
        if (is.not.empty(this.state.userInput) && is.not.undefined(this.state.userInput) && this.state.userInput.trim().length > 0) {
            this.props.searchUser(this.state.userInput);
            //this.props.listNotesAction(this.state.userInput);
            this.state.userInput = '';
        }
    }

    render(props, {user}) {
        return (
            <div id='home'>
                <form id='search-user' onSubmit={this.searchUser}>
                    <input id='user-input' type="text" onInput={this.updateSearchText} placeholder='Username'
                           value={this.state.userInput} aria-label='username'/>
                    <button
                        class={`mdl-button mdl-js-ripple-effect mdl-js-button ${this.state.userInput.trim().length <= 0 ? 'mdl-button--disabled' : null}`}
                        type='submit' disabled={this.state.userInput.trim().length <= 0}>{user.loading ? <Icon icon='sync' color='white' className='icon-spinner'/> : 'Search'}
                    </button>
                </form>'
            </div>
        )
    }
}
