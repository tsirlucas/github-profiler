import React from 'react';
import Notes from './components/Notes/Notes'
import User from './components/User/User'

export default class Home extends React.Component {
    render() {
        return (
            <div className='home row'>
                <User />
                <Notes />
            </div>

        )
    }
}