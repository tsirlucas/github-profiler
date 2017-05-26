import Navbar from './navbar/Navbar';
import {Component, h} from 'preact';

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
