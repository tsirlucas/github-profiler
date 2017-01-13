import React from 'react';
import {browserHistory} from 'react-router';
import {AppBar, Tabs, Tab, FontIcon} from 'material-ui';

export default class Navbar extends React.Component {
    render() {
        const transitions = {
            user: (tab) => browserHistory.push('/'),
            bonus: (tab) => browserHistory.push('/bonus'),
        };

        return (
            <div>
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
        <Tab onActive={transitions.user}
             className='p-r-sm p-l-sm'
             icon={<FontIcon className='fa fa-user'/>}
             label='USER'
        />
        <Tab onActive={transitions.bonus}
             className='p-r-sm p-l-sm'
             icon={<FontIcon className={'fa fa-plus'}/>}
             label='BONUS'
        />
    </Tabs>
);

Navbar.contextTypes = {
    router: React.PropTypes.object.isRequired
};