import Navbar from '../app/components/Navbar.js';
import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                {this.props.children}
            </div>
        )
    }
}