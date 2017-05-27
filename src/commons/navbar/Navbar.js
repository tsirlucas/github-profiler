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
        const {route} = getState();
        this.setState({path: route.path});
    }

    componentWillMount() {
        this.syncState(store)
        this.unsubscribe = store.subscribe(() => this.syncState(store));
    }

    componentDidUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Layout fixed-header>
                <LayoutHeader>
                    <Layout.HeaderRow>
                        <Layout.Title>
                            <span style="cursor:pointer;">Github Profiler</span>
                        </Layout.Title>
                        <Layout.TabPanel>
                            <LayoutTab onClick={() => dispatchChangeRoute('/')}
                                       active={this.state.path === '/'}>HOME</LayoutTab>
                            <LayoutTab onClick={() => dispatchChangeRoute('/user')}
                                       active={this.state.path === '/user'}>USER</LayoutTab>
                            <LayoutTab onClick={() => dispatchChangeRoute('/repos')}
                                       active={this.state.path === '/repos'}>REPOS</LayoutTab>
                            <LayoutTab onClick={() => dispatchChangeRoute('/notes')}
                                       active={this.state.path === '/notes'}>NOTES</LayoutTab>
                        </Layout.TabPanel>
                    </Layout.HeaderRow>
                </LayoutHeader>
            </Layout>
        )
    }
}
