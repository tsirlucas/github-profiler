import React from 'react';
import {Card, CardHeader, List, ListItem, TextField, FlatButton, Avatar, Divider} from 'material-ui';
import {searchUserAction} from './UserActions.js';
import {listNotes} from '../Notes/NotesActions.js'
import is from 'is_js';

export default class User extends React.Component {
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
            store.dispatch(listNotes(this.state.userInput));
            this.state.userInput = '';
        }
    }

    render() {
        let store = this.context.store;
        let state = store.getState();

        return (
            <UserTemplate state={state.UserReducer}
                          handleUpdateInput={this.updateSearchText}
                          searchUser={this.searchUser}
                          userToInput={this.state.userInput}/>
        )
    }
}

User.contextTypes = {
    store: React.PropTypes.object
};

const UserTemplate = ({state, handleUpdateInput, searchUser, userToInput}) => (
    <div>
        <UserCard handleUpdateInput={handleUpdateInput} searchUser={searchUser} user={state.data.user}
                  userToInput={userToInput}/>
        <Repos repos={state.data.repos}/>
    </div>
);

const UserCard = ({handleUpdateInput, searchUser, user, userToInput}) => (
    <div className='col s12 m12 l4'>
        <Card>
            <CardHeader
                title='Profile'
                subtitle='Users profile'
            />
            <div className='center-align'>
                <UserSearch handleUpdateInput={handleUpdateInput} searchUser={searchUser} userValue={userToInput}/>
            </div>
            <Divider />
            <div className="avatar-container">
                <Avatar src={user.avatar_url}/> <span
                className='right'>{user.login}</span>
            </div>
            <ul className='collection'>
                <li className='collection-item'>
                    <div>Name: <span className='grey-text'>{user.name || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Email: <span className='grey-text'>{user.email || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Location: <span className='grey-text'>{user.location || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Company: <span className='grey-text'>{user.company || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Followers: <span className='grey-text'>{user.followers || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Following: <span className='grey-text'>{user.following || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Public Repos: <span className='grey-text'>{user.public_repos || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Blog: <span className='grey-text'>{user.blog || 'Not available'}</span></div>
                </li>
            </ul>
        </Card>
    </div>
);

const UserSearch = ({handleUpdateInput, searchUser, userValue}) => (
    <form onSubmit={searchUser}>
        <TextField id='user-input' onChange={handleUpdateInput} value={userValue}/>
        <FlatButton label='Search' onClick={searchUser} disabled={userValue.trim().length <= 0}/>
    </form>
);

const Repos = ({repos, removeHandler}) => (
    <div className='col s12 m12 l4'>
        <Card>
            <CardHeader
                title='Repositories'
                subtitle='Users repositories'
            />
            <List className="repos-list">
                {repos.map((repo) => {
                    return <ListItem
                        primaryText={repo.name}
                        secondaryText={repo.description}
                        onClick={() => window.open(repo.html_url, '_blank')}
                        key={repos.indexOf(repo)}
                    />
                })}
            </List>
        </Card>
    </div>
);