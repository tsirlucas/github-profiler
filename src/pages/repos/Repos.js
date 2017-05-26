import {h, Component} from 'preact';
import {List, ListItem} from 'preact-mdl';

export default class Repos extends Component {
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

        return (
            <UserTemplate state={state.UserReducer}/>
        )
    }
}

const UserTemplate = ({state}) => <ReposTemplate repos={state.data.repos}/>;


const ReposTemplate = ({repos, removeHandler}) => (
    <div id="repos">
        <List className="repos-list">
            {repos.map((repo) => {
                return <ListItem
                    onClick={() => window.open(repo.html_url, '_blank')}
                    key={repos.indexOf(repo)}
                >
                    <div>
                        <h5>{repo.name}</h5>
                        <p>{repo.description}</p>
                    </div>
                </ListItem>
            })}
        </List>
    </div>
);
