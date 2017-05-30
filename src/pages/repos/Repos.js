import {h, Component} from 'preact';

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
                    <ul className="mdl-list repos-list">
                        {repos.map((repo) => {
                            return <li className='mdl-list__item'
                                onClick={() => window.open(repo.html_url, '_blank')}
                                key={repos.indexOf(repo)}
                            >
                                <div className='pinned-repo-item'>
                                    <h5>{repo.name}</h5>
                                    <p>{repo.description}</p>
                                </div>
                            </li>
                        })}
                    </ul>
                </div> : <NoUser/>
        )
    }
}
