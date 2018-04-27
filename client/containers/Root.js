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
import createRoutes from '../routes';

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
	componentDidMount = () => {
	    console.log("asa")
    }
	handleClickOpen = () => {
	    this.props.openLoginDialog();
	}

		handleSubmit = (data) => {
		const username = data && data.username || "";
		const password = data && data.password || "";

		const {usernameError, passwordError} = getErrorMessages(username, password);
		if(usernameError || passwordError){
			this.setState({ usernameErrorText: usernameError, passwordErrorText: passwordError });
		} else {
			this.setState({ usernameErrorText: "", passwordErrorText: "" });
			this.props.manualLogin({ // this function is passed in via react-redux
					username,
					password			
				})
		}
	}
	toSignUp = path => {
		this.props.closeLoginDialog();
		this.props.toSignUp(path);
	}
	handleClose = () => {
		this.setState({ usernameErrorText: "", passwordErrorText: "" });
	    this.props.closeLoginDialog();
	}
	handleCloseMessage = () => {
		this.props.closeMessage();
	}
	
	render() {
		const { store, history, persistor, classes } = this.props;
		const state = store.getState();
		const { user: {authenticated}} = state.reducer;
		const routes = createRoutes(store);
		return	(
			
		<Provider store={store}>
		    <ConnectedRouter history={history}>
		    <React.Fragment>
			    
		        {routes}
		        
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
	}), { manualLogin, closeLoginDialog, openLoginDialog, toSignUp, closeMessage } )(withStyles(styles)(Root))
