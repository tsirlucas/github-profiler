import {Component, h} from 'preact';

import Navbar from './navbar/Navbar';

export default class App extends Component {
  render() {
    return (
      <div className="template">
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
