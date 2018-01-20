import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/Home';
import Header from '../containers/Header';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Places from '../containers/Places';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/es/integration/react';


const Root = ({ store, history, persistor }) => {
	

	return	(
		
	<Provider store={store}>
	<PersistGate
		
        persistor={persistor}>
	    { /* ConnectedRouter will use the store from Provider automatically */ }
	    <ConnectedRouter history={history}>
	    <React.Fragment>
	    <Route render={(props) => {
                  console.log(props)
                  console.log("props2")
                  return (
                    <Header locationPathname={props.location.pathname}/>
                  )
                }} />
	      <Switch>
	        <Route exact path="/" component={Home}/>
	        <Route path="/login" component={Login}/>
	        <Route path="/signup" component={Signup}/>
	        <Route path="/places" component={Places}/>
	      </Switch>
	      </React.Fragment>
	    </ConnectedRouter>
	</PersistGate>
	</Provider>

)
}
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