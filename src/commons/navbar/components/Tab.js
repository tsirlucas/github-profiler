import React from 'react';

export default class Tab extends React.Component {
    render() {
        return (
            <div className="tab">
                {this.props.children}
            </div>
        )
    }
}
