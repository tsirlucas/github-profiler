import React from 'react';
import {browserHistory} from 'react-router';
import {AppBar, Tabs, Tab, FontIcon} from 'material-ui';

export default class Navbar extends React.Component {
  render() {
    const transitions = {
      home: (tab) => browserHistory.push('/'),
      user: (tab) => browserHistory.push('/user'),
      repos: (tab) => browserHistory.push('/repos'),
      notes: (tab) => browserHistory.push('/notes')
    };

    return (
      <div className="navbar">
        <AppBar title={'Github Profiler'}
                showMenuIconButton={false}
                children={<NavbarTabs transitions={transitions}/>}
        />
      </div>
    )
  }
}

const NavbarTabs = ({transitions}) => (
  <Tabs>
    <Tab onClick={transitions.home}
         className='p-r-sm p-l-sm'
         icon={<FontIcon className='fa fa-home'/>}
         label='HOME'
    />
    <Tab onClick={transitions.user}
         className='p-r-sm p-l-sm'
         icon={<FontIcon className={'fa fa-user'}/>}
         label='USER'
    />
    <Tab onClick={transitions.repos}
         className='p-r-sm p-l-sm'
         icon={<FontIcon className={'fa fa-folder-open'}/>}
         label='REPOS'
    />
    <Tab onClick={transitions.notes}
         className='p-r-sm p-l-sm'
         icon={<FontIcon className={'fa fa-sticky-note'}/>}
         label='NOTES'
    />
  </Tabs>
);
