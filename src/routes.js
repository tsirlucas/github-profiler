import Template from './commons/Template';
import Home from './pages/home/Home';
import User from './pages/user/User';
import Repos from './pages/repos/Repos';
import Notes from './pages/notes/Notes';
import {Component, h} from 'preact';
import {Router, Route} from 'react-router'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory();

export default class Routes extends Component {
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

