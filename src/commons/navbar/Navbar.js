import {h, Component} from 'preact';
import {Layout, LayoutHeader, LayoutTab} from 'preact-mdl';

import {history} from '../../routes';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const transitions = {
      home: (tab) => history.push('/'),
      user: (tab) => history.push('/user'),
      repos: (tab) => history.push('/repos'),
      notes: (tab) => history.push('/notes')
    };
    return (
      <Layout fixed-header>
        <LayoutHeader>
        <Layout.HeaderRow>
          <Layout.Title>
            <span style="cursor:pointer;">Github Profiler</span>
          </Layout.Title>
          <Layout.TabPanel>
            <LayoutTab onClick={transitions.home} active={history.location.pathname === '/'}>HOME</LayoutTab>
            <LayoutTab onClick={transitions.user} active={history.location.pathname === '/user'}>USER</LayoutTab>
            <LayoutTab onClick={transitions.repos} active={history.location.pathname === '/repos'}>REPOS</LayoutTab>
            <LayoutTab onClick={transitions.notes} active={history.location.pathname === '/notes'}>NOTES</LayoutTab>
          </Layout.TabPanel>
        </Layout.HeaderRow>
        </LayoutHeader>
      </Layout>
    )
  }
}
