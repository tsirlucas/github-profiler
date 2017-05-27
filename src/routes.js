import {Component, h} from 'preact';
import {bind} from 'decko';
import {Router, Route} from 'react-router'
import createHistory from 'history/createHashHistory'

import {store} from './store';
import Template from './commons/Template';
import Home from './pages/home/Home';
import User from './pages/user/User';
import Repos from './pages/repos/Repos';
import Notes from './pages/notes/Notes';
import {dispatchChangeRoute} from './core/router/router.service';

export const history = createHistory();

export default class Routes extends Component {
    @bind
    onEnter() {
        const nextURL = store.getState().route.path;
        const currURL = window.location.hash.slice(1);
        if (currURL !== nextURL) {
            dispatchChangeRoute(currURL);
        }
    }

    @bind
    syncState(store) {
        const nextURL = store.getState().route.path;
        if (this.state.currentURL !== nextURL) {
            this.setState({currentURL: nextURL});
            history.push(nextURL);
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillMount() {
        this.onEnter();
        this.unsubscribe = store.subscribe(() => this.syncState(store));
    }

    componentDidUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/" component={Template}/>
                    <div className="page">
                        <Route exact path="/" component={Home}/>
                        <Route path="/user" component={User}/>
                        <Route path="/repos" component={Repos}/>
                        <Route path="/notes" component={Notes}/>
                    </div>
                </div>
            </Router>
        )
    }
}

