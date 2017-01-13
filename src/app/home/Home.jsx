import React from 'react';
import Notes from './components/Notes/Notes.jsx'
import User from './components/User/User.jsx'

export default class Home extends React.Component {
    render() {
        return (
            <div className='row'>
                <User />
                <Notes />
            </div>

        )
    }
}