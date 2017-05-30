import {h, Component} from 'preact';
import {bind} from 'decko';
import {Layout, LayoutHeader, LayoutTab} from 'preact-mdl';

import {store} from '../../store';
import {dispatchChangeRoute} from '../../core/router/router.service';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    @bind
    syncState({getState}) {
        const {route, user} = getState();
        this.setState({path: route.path, user: user.login});
    }

    componentWillMount() {
        this.syncState(store);
        this.unsubscribe = store.subscribe(() => this.syncState(store));
    }

    componentDidUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="mdl-layout__container">
                <div fixed-header="true"
                     className="mdl-layout mdl-js-layout mdl-layout--fixed-header is-small-screen is-upgraded"
                     data-upgraded=",MaterialLayout">
                    <header className="mdl-layout__header is-casting-shadow">
                        <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">
                            <span style="cursor: pointer;">Github Profiler</span>
                        </span >
                            <section className="mdl-layout__tab-panel">
                                <div className="page-content">
                                    <a onClick={() => dispatchChangeRoute('/')}
                                       active={this.state.path === '/'}
                                       className={`mdl-layout__tab ${this.state.path === '/' ? 'mdl-layout__tab--active is-active' : null}`}>HOME</a>
                                    <a onClick={() => dispatchChangeRoute('/user')}
                                       active={this.state.path === '/user'}
                                       className={`mdl-layout__tab ${this.state.path === '/user' ? 'mdl-layout__tab--active is-active' : null}`}>USER</a>
                                    <a onClick={() => dispatchChangeRoute('/repos')}
                                       active={this.state.path === '/repos'}
                                       className={`mdl-layout__tab ${this.state.path === '/repos' ? 'mdl-layout__tab--active is-active' : null}`}>REPOS</a>
                                    <a onClick={() => dispatchChangeRoute('/notes')}
                                       active={this.state.path === '/notes'}
                                       className={`mdl-layout__tab ${this.state.path === '/notes' ? 'mdl-layout__tab--active is-active' : null}`}>NOTES</a>
                                </div >
                            </section >
                        </div>
                    </header >
                </div >
            </div >
        )
    }
}
