import React, {Component} from 'react'
import Header from '../containers/Header'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
    container: {
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center',
	    width: 500,
	    maxWidth: '100%'
    },
    form: {
	  	display: 'flex',
	    flexDirection: 'column',
	    justifyContent: 'center',
	    alignItems: 'center',
	    width: 500,
	    maxWidth: '100%'
    },
    textField: {
	    marginLeft: theme.spacing.unit,
	    marginRight: theme.spacing.unit,
	    width: 300,
	    maxWidth: '100%'
    },
    menu: {
	    width: 200,
    },
    button: {
  	  	marginTop:50
    }
});

class Signup extends Component{

	constructor() {
		super();
		this.usernameInput = null;
		this.passwordInput = null;
		this.confirmPasswordInput = null;
		this.state = {
		    usernameErrorMessage: "",
		    passwordErrorMessage: "",
		    passwordConfirmErrorMessage: "",
	    };
	}


	onSignupSubmit = (event) => {		
		event.preventDefault()
		const username = this.usernameInput.value;
		const password = this.passwordInput.value;
		const confirm = this.confirmPasswordInput.value;
		if(inputFieldErrors(username, password, confirm)){
			const {usernameError, passwordError, passwordConfirmError} = getErrorMessages(username, password, confirm);
			this.setState({
				usernameErrorMessage: usernameError,
				passwordErrorMessage: passwordError,
				passwordConfirmErrorMessage: passwordConfirmError
			})
		} else {
			this.props.signUp({ 
				username,
				password,
				confirm			
			}) 
		}
	};
	render(){
		const { classes} = this.props;
		return (
		  <div className={classes.root}>
		  	<div className={classes.container} style={{marginTop:200}}>
				<form className={classes.form} >
					<TextField
					  className={classes.textField} 
	                  required
	                  autoFocus
	                  margin="dense"
	                  id="username"
	                  label="Username"
	                  type="username"
	                  helperText={this.state.usernameErrorMessage}
	                  inputRef={(input) => { this.usernameInput = input; }}
	                  margin="normal"
	                />
	                <TextField
	                 className={classes.textField} 
	                  required
	                  margin="dense"
	                  id="password"
	                  label="Password"
	                  type="password"
	                  helperText={this.state.passwordErrorMessage}
	                  inputRef={(input) => { this.passwordInput = input; }}
	                  margin="normal"
	                />
	                <TextField
	                 className={classes.textField} 
	                  required
	                  margin="dense"
	                  id="confirm-password"
	                  label="Confirm Password"
	                  type="password"
	                  helperText={this.state.passwordConfirmErrorMessage}
	                  inputRef={(input) => { this.confirmPasswordInput = input; }}
	                  margin="normal"
	                />
				</form>	
				<div className={classes.button}>
				<Button raised color="accent" onClick={this.onSignupSubmit}>
	                sign up
	            </Button>
	               </div>
			</div>	
		  	
		  </div>
		)
	}
}
export default withStyles(styles)(Signup)


function inputFieldErrors(username, password, confirm) {
	return !username || !password || !confirm || password != confirm
}				

function getErrorMessages(username, password, confirm){
	let usernameError = username ? "" : "Username is required";
	let passwordError = password ? "" : "Password is required";
	let passwordConfirmError = confirm ? "" : "Confirm password is required";
	if(password && confirm && password != confirm){
		passwordConfirmError = "Error in password confirmation"
	}
	return {usernameError, passwordError, passwordConfirmError}
}