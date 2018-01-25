import React, { Component } from 'react'
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
import LoginDialog from './LoginDialog';
import { manualLogin, closeLoginDialog, openLoginDialog } from '../../actions';
import { connect } from 'react-redux';

class Root extends Component{
// const Root = ({ store, history, persistor }) => {
	constructor(props){
		super(props);

	// }
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
		    usernameErrorText: "",
		    passwordErrorText: ""
	    };
	}
	
	handleClickOpen() {
	    this.props.store.dispatch(openLoginDialog())
	}

 // this.setState({ open: false, list: [] });

	handleSubmit = (data) => {
		const username = data && data.username || "";
		const password = data && data.password || "";
		console.log(username)
		// Passed in via react-redux. Returns a promise.
		// if(username.trim() && password.trim()){
		// 	this.props.store.dispatch(manualLogin({ // this function is passed in via react-redux
		// 				username,
		// 				password			
		// 			}))
		// 	this.handleClose();
		// } else {
			if(!username || !username.trim()){
				if(password && password.trim()){
					this.setState({ usernameErrorText: "Username is required", passwordErrorText: "" });
				} else {
					this.setState({ usernameErrorText: "Username is required", passwordErrorText: "password is required" });
				}
			}
			else if (!password || !password.trim()){
				this.setState({ usernameErrorText: "", passwordErrorText: "password is required" });
			} else {
				this.props.store.dispatch(manualLogin({ // this function is passed in via react-redux
						username,
						password			
					}))
				this.handleClose();
			}
		// }
	}

	handleClose() {
		this.setState({ usernameErrorText: "", passwordErrorText: "" });
	    this.props.store.dispatch(closeLoginDialog())
	}

	render() {
		const { store, history, persistor } = this.props;
	console.log(store.getState().reducer.user.loginDialogOpen)
		return	(
			
		<Provider store={store}>
		<PersistGate
			
	        persistor={persistor}>
		    { /* ConnectedRouter will use the store from Provider automatically */ }
		    <ConnectedRouter history={history}>
		    <React.Fragment>
			    <Route render={(props) => {
	                  return (
	                    <Header 
	                    	locationPathname={props.location.pathname}
                    	/>
	                  )
	                }} />
		        <Switch>
			        <Route exact path="/" component={Home}/>
			        <Route path="/login" component={Login}/>
			        <Route path="/signup" component={Signup}/>
			        <Route path="/places" component={Places}/>
		        </Switch>
		        <LoginDialog
	            	open={this.props.isOpen}
	            	onSubmit={this.handleSubmit}
		            onClose={this.handleClose}
		            usernameErrorText={this.state.usernameErrorText}
		            passwordErrorText={this.state.passwordErrorText}
		        />
		      </React.Fragment>
		    </ConnectedRouter>
		</PersistGate>
		</Provider>

	)
}
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

export default connect(({reducer}) =>({isOpen: reducer.user.loginDialogOpen}))(Root)
// connect(({reducer}) =>({isOpen: reducer.user.loginDialogOpen});, { manualLogin })(Login);