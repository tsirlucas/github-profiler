import {h, Component} from 'preact';

export default class User extends Component {
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

const UserTemplate = ({state, userLabels}) => <UserCard user={state.data.user} userLabels={userLabels}/>;


const UserCard = ({user, userLabels}) => (
  <div>
    <div className="avatar-container">
      <Avatar src={user.avatar_url}/>
      <h3>{user.login}</h3>
    </div>
    <UserInfo user={user} userLabels={userLabels}/>
  </div>
);

const Avatar = ({src}) => (
  <img src={src} alt='avatar' style="border-rounded: 50%"/>
);

const UserInfo = ({user, userLabels}) => (
  <ul className='collection'>
    {Object.keys(userLabels).map((key, index) => {
      return (
        <li className='collection-item' key={index}>
          <div>{userLabels[key]}: <span className='grey-text'>{user[key] || 'Not available'}</span></div>
        </li>
      )
    })}
  </ul>
);
