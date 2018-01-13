import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import Home from './Home';
import Login from './Login';
import { ConnectedRouter } from 'react-router-redux'

const Root = ({ store, history }) => (
	<Provider store={store}>
	    { /* ConnectedRouter will use the store from Provider automatically */ }
	    <ConnectedRouter history={history}>
	      <div>
	        <Route exact path="/" component={Home}/>
	        <Route path="/login" component={Login}/>
	      </div>
	    </ConnectedRouter>
	</Provider>



)
	        // <Route path="/about" component={About}/>
	        // <Route path="/topics" component={Topics}/>
  // <Provider store={store}>
  //   <Router>
  //     <Route path="/" component={App} />
  //   </Router>
  // </Provider>
// Root.propTypes = {
//   store: PropTypes.object.isRequired
// }

export default Root