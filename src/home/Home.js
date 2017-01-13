import React from 'react';
import Notes from './components/Notes/Notes.js'
import User from './components/User/User.js'

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