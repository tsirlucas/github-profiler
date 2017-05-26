import {h, Component} from 'preact';
import {getCurrentState} from '../../store';

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
        let {user} = getCurrentState();

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
            <div id='user'>
                <div className="avatar-container">
                    <Avatar src={user.avatar_url}/>
                    <h3>{user.login}</h3>
                </div>
                <UserInfo user={user} userLabels={userLabels}/>
            </div>
        )
    }
}

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
