import {h, Component} from 'preact';
import {List, ListItem} from 'preact-mdl';

import {store, getCurrentState} from '../../store';
import NoUser from '../../commons/NoUser';

export default class Repos extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {repos, login} = getCurrentState().user;
        return (login ?
                <div id="repos">
                    <List className="repos-list">
                        {repos.map((repo) => {
                            return <ListItem
                                onClick={() => window.open(repo.html_url, '_blank')}
                                key={repos.indexOf(repo)}
                            >
                                <div className='pinned-repo-item'>
                                    <h5>{repo.name}</h5>
                                    <p>{repo.description}</p>
                                </div>
                            </ListItem>
                        })}
                    </List>
                </div> : <NoUser/>
        )
    }
}
