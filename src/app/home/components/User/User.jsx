import React from 'react';
import {Card, CardHeader, List, ListItem, TextField, FlatButton, Avatar, Divider} from 'material-ui';
import searchUserAction from './UserActions';
import {listNotesAction} from '../Notes/NotesActions'
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
            store.dispatch(listNotesAction(this.state.userInput));
            this.state.userInput = '';
        }
    }

    render() {
        let store = this.context.store;
        let state = store.getState();

        const userLabels = {
            name: 'Name',
            email: 'Email',
            location: 'Location',
            company: 'Company',
            followers: 'Followers',
            following: 'Following',
            public_repos: 'Public repos',
            blog: 'Blog'
        };

        return (
            <UserTemplate state={state.UserReducer}
                          handleUpdateInput={this.updateSearchText}
                          searchUser={this.searchUser}
                          userToInput={this.state.userInput}
                          userLabels={userLabels}/>
        )
    }
}

User.contextTypes = {
    store: React.PropTypes.object
};

const UserTemplate = ({state, handleUpdateInput, searchUser, userToInput, userLabels}) => (
    <div>
        <UserCard handleUpdateInput={handleUpdateInput} searchUser={searchUser} user={state.data.user}
                  userToInput={userToInput} userLabels={userLabels}/>
        <Repos repos={state.data.repos}/>
    </div>
);

const UserCard = ({handleUpdateInput, searchUser, user, userToInput, userLabels}) => (
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
                {Object.keys(userLabels).map((key, index) => {
                    return (
                        <li className='collection-item' key={index}>
                            <div>{userLabels[key]}: <span className='grey-text'>{user[key] || 'Not available'}</span></div>
                        </li>
                    )
                })}
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
