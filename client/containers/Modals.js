import React, { Component } from 'react';
import LoginDialog from '../components/LoginDialog';
import MessageDialog from '../components/MessageDialog';
import { manualLogin, returnFromLogIn, closeLoginDialog, openLoginDialog, toSignUp, closeMessage } from '../../actions';
import { connect } from 'react-redux';
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

class Modals extends Component{
	state = {
	    usernameErrorText: "",
	    passwordErrorText: "",
	    
    };

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
			this.props.manualLogin({ 
					username,
					password			
				})
		}
	}
	
	toSignUp = path => {
		this.props.closeLoginDialog();
		this.props.toSignUp();
	}
	
	handleClose = () => {
		this.setState({ usernameErrorText: "", passwordErrorText: "" });
	    this.props.closeLoginDialog();
	}
	
	handleCloseMessage = () => {
		this.props.closeMessage();
	}

	render() {
		const { classes } = this.props;
		
		return	(
		        <React.Fragment>
                  	<LoginDialog
		            	open={this.props.isOpen}
		            	onSubmit={this.handleSubmit}
		            	onSignUp={() => this.toSignUp()}
			            onClose={this.handleClose}
			            usernameErrorText={this.state.usernameErrorText}
			            passwordErrorText={this.state.passwordErrorText}
			        />
				
	                <MessageDialog
	                	open={this.props.isOpenMessage}
	                	onClose={this.handleCloseMessage}
				        message={this.props.message}
	                />
	                {this.props.loading && <CircularProgress size={160} className={classes.buttonProgress} />}
                </React.Fragment>
	)}
}

export default connect(({reducer}) =>(
	{
		isOpen: reducer.user.loginDialogOpen, 
		message: reducer.user.message, 
		isOpenMessage: reducer.user.messageDialogOpen,
		loading: reducer.user.isWaiting
	}), { manualLogin, returnFromLogIn, closeLoginDialog, openLoginDialog, toSignUp, closeMessage } )(withStyles(styles)(Modals))
