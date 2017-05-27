import {h, Component} from 'preact';
import {List, ListItem} from 'preact-mdl';

import {store, getCurrentState} from '../../store';

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
        const {repos} = getCurrentState().user;
        return (
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
            </div>
        )
    }
}
