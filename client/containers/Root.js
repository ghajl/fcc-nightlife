import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Signup from './Signup';
import Places from './Places';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import LoginDialog from '../components/LoginDialog';
import NotFound from '../components/NotFound';
import MessageDialog from '../components/MessageDialog';
import { manualLogin, closeLoginDialog, openLoginDialog, toSignUp, closeMessage } from '../../actions';
import { connect } from 'react-redux';
import {defaultLocation} from '../../util/locations';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import getErrorMessages from '../helpers/InputCheck';

const styles = theme => ({
    buttonProgress: {
	    position: 'fixed',
	    top: '50%',
	    left: '50%',
	    transform: 'translate(-50%, -50%)',	
	    zIndex: 2000
    },
});


class Root extends Component{
	state = {
		    usernameErrorText: "",
		    passwordErrorText: "",
		    
	    };
	
	handleClickOpen = () => {
	    this.props.store.dispatch(openLoginDialog())
	}

		handleSubmit = (data) => {
		const username = data && data.username || "";
		const password = data && data.password || "";

		const {usernameError, passwordError} = getErrorMessages(username, password);
		if(usernameError || passwordError){
			this.setState({ usernameErrorText: usernameError, passwordErrorText: passwordError });
		} else {
			this.setState({ usernameErrorText: "", passwordErrorText: "" });
			this.props.store.dispatch(manualLogin({ // this function is passed in via react-redux
					username,
					password			
				}))
		}
	}
	toSignUp = path => {
		this.props.store.dispatch(closeLoginDialog())
		this.props.store.dispatch(toSignUp(path))
	}
	handleClose = () => {
		this.setState({ usernameErrorText: "", passwordErrorText: "" });
	    this.props.store.dispatch(closeLoginDialog())
	}
	handleCloseMessage = () => {
		this.props.store.dispatch(closeMessage())
	}
	
	render() {
		const { store, history, persistor, classes } = this.props;
		return	(
			
		<Provider store={store}>
		<PersistGate
			
	        persistor={persistor}>
		    
		    <ConnectedRouter history={history}>
		    <React.Fragment>
			    
		        <Switch>

			        <Route exact path="/" render={() => <Redirect to={`/location?loc=${defaultLocation.address}`} />}/>
			        <Route path="/location" component={Home}/>
			        <Route path="/signup" component={Signup}/>
			        <Route path="/places" component={Places}/>
			        <Route component={NotFound} />
		        </Switch>
		        
		        <Route render={(props) => {
		        	return (
	                  	<LoginDialog
			            	open={this.props.isOpen}
			            	onSubmit={this.handleSubmit}
			            	onSignUp={() => this.toSignUp(props.location)}
				            onClose={this.handleClose}
				            usernameErrorText={this.state.usernameErrorText}
				            passwordErrorText={this.state.passwordErrorText}
				        />
				        )
                }} /> 
                <MessageDialog
                	open={this.props.isOpenMessage}
                	onClose={this.handleCloseMessage}
			        message={this.props.message}
                />
                {this.props.loading && <CircularProgress size={160} className={classes.buttonProgress} />}
		      </React.Fragment>
		    </ConnectedRouter>
		</PersistGate>
		</Provider>

		)
	}
}

export default connect(({reducer}) =>(
	{
		isOpen: reducer.user.loginDialogOpen, 
		message: reducer.user.message, 
		isOpenMessage: reducer.user.messageDialogOpen,
		loading: reducer.user.isWaiting
	}))(withStyles(styles)(Root))
