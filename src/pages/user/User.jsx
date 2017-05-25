import React from 'react';
import {Card, CardHeader, List, ListItem, Avatar, Divider} from 'material-ui';

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
                    userLabels={userLabels}/>
    )
  }
}

User.contextTypes = {
  store: React.PropTypes.object
};

const UserTemplate = ({state, userLabels}) => <UserCard user={state.data.user} userLabels={userLabels}/>


const UserCard = ({user, userLabels}) => (
  <div className='col s12 m12 l4'>
    <Card>
      <CardHeader
        title='Profile'
        subtitle='Users profile'
      />
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
