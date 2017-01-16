import Navbar from './components/Navbar';
import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div className="template">
                <Navbar />
                {this.props.children}
            </div>
        )
    }
}