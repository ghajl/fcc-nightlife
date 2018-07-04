import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config'

class AppRoot extends Component {
  render() {
    return (
      <div>
        <h2>React Universal App</h2>
        <Link to="/location"> Home </Link>
        <Link to="/places"> List </Link>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

export default AppRoot;