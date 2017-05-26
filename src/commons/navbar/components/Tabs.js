import React from 'react';

export default class Tabs extends React.Component {
    render() {
        return (
            <div className="tabs">
                {this.props.children}
            </div>
        )
    }
}
