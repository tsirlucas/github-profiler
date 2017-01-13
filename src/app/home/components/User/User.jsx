import React from 'react';
import {Card, CardHeader, List, ListItem, TextField, FlatButton, Avatar, Divider} from 'material-ui';
import {searchUserAction} from './UserActions.jsx';
import {listNotes} from '../Notes/NotesActions.jsx'

export default class User extends React.Component {
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
        const updateSearchText = (ev, text) => this.userInput = text.toLowerCase();
        const searchUser = () => {
            store.dispatch(searchUserAction(this.userInput));
            store.dispatch(listNotes(this.userInput))
        };

        return <UserTemplate state={state.UserReducer} handleUpdateInput={updateSearchText} searchUser={searchUser}/>
    }
}

User.contextTypes = {
    store: React.PropTypes.object
};

const UserTemplate = ({state, handleUpdateInput, searchUser}) => (
    <div>
        <UserCard handleUpdateInput={handleUpdateInput} searchUser={searchUser} user={state.data.user}/>
        <Repos repos={state.data.repos}/>
    </div>
);

const UserCard = ({handleUpdateInput, searchUser, user}) => (
    <div className='col s12 m12 l4'>
        <Card>
            <CardHeader
                title='Profile'
                subtitle='Users profile'
            />
            <div className='center-align'>
                <UserSearch handleUpdateInput={handleUpdateInput} searchUser={searchUser}/>
            </div>
            <Divider />
            <div style={{padding: '10px'}}>
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
                    <div>Purlic Repos: <span className='grey-text'>{user.public_repos || 'Not available'}</span></div>
                </li>
                <li className='collection-item'>
                    <div>Blog: <span className='grey-text'>{user.blog || 'Not available'}</span></div>
                </li>
            </ul>
        </Card>
    </div>
);

const UserSearch = ({handleUpdateInput, searchUser}) => (
    <div>
        <TextField id='user-input' onChange={handleUpdateInput}/>
        <FlatButton label='Search' onClick={searchUser}/>
    </div>
);

const Repos = ({repos, removeHandler}) => (
    <div className='col s12 m12 l4'>
        <Card>
            <CardHeader
                title='Repositories'
                subtitle='Users repositories'
            />
            <List>
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