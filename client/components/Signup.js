import React, {Component} from 'react'
import Header from '../containers/Header'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import getErrorMessages from '../helpers/InputCheck';
import Page from './Page';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: '1 0 auto',
		marginTop: '60px',
		'@media (max-width: 600px)': {
            marginTop: '50px',
        },
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
	handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSignupSubmit(event);
        }
    }

	onSignupSubmit = (event) => {		
		event.preventDefault()
		const username = this.usernameInput.value;
		const password = this.passwordInput.value;
		const confirm = this.confirmPasswordInput.value;
		
		const {usernameError, passwordError, passwordConfirmError} = getErrorMessages(username, password, confirm);
		if(usernameError || passwordError || passwordConfirmError){
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
		  <Page location={this.props.location} >
		  <div className={classes.root}>
		  	<div className={classes.container}>
				<form className={classes.form} >
					<TextField
					  className={classes.textField} 
	                  required
	                  error={this.state.usernameErrorMessage.length > 0}
	                  margin="dense"
	                  id="username"
	                  label="Username"
	                  type="username"
	                  helperText={this.state.usernameErrorMessage}
	                  inputRef={(input) => { 
                        if(input) {
                            this.usernameInput = input; setTimeout(() => {this.usernameInput.focus()}, 300)}
                        }
                      }
	                  margin="normal"
	                  onKeyPress={this.handleKeyPress}
	                />
	                <TextField
	                 className={classes.textField} 
	                  required
	                  error={this.state.passwordErrorMessage.length > 0}
	                  margin="dense"
	                  id="password"
	                  label="Password"
	                  type="password"
	                  helperText={this.state.passwordErrorMessage}
	                  inputRef={(input) => { this.passwordInput = input; }}
	                  margin="normal"
	                  onKeyPress={this.handleKeyPress}
	                />
	                <TextField
	                 className={classes.textField} 
	                  required
	                  error={this.state.passwordConfirmErrorMessage.length > 0}
	                  margin="dense"
	                  id="confirm-password"
	                  label="Confirm Password"
	                  type="password"
	                  helperText={this.state.passwordConfirmErrorMessage}
	                  inputRef={(input) => { this.confirmPasswordInput = input; }}
	                  margin="normal"
	                  onKeyPress={this.handleKeyPress}
	                />
				</form>	
				<div className={classes.button}>
				<Button raised color="accent" onClick={this.onSignupSubmit}>
	                sign up
	            </Button>
	               </div>
			</div>	
		  	</div>
		  </Page>
		)
	}
}
export default withStyles(styles)(Signup)


function inputFieldErrors(username, password, confirm) {
	return !username || !password || !confirm || password != confirm
}				

// function getErrorMessages(username, password, confirm){

// 	let _username = username.trim();
// 	let _password = password.trim();
// 	let _confirm = confirm.trim();
// 	let usernameError = '';
// 	let passwordError = '';
// 	let passwordConfirmError = '';
// 	if(_username == '') usernameError = 'Username is required';
// 	if(_password == '') passwordError = 'Password is required';
// 	if(_confirm == '') passwordConfirmError = 'Password confirmation is required';
// 	if(/[^a-zA-Z0-9_.]/g.test(_username)) usernameError = 'Username must contain only letters, digits, underscore and period';
// 	if(!/[a-zA-Z0-9]/g.test(_username)) usernameError = 'Username must contain at least one letter or digit';
// 	if(/[^a-zA-Z0-9]/g.test(_password)) passwordError = 'Password must contain only letters and digits';
// 	if(/[^a-zA-Z0-9]/g.test(_confirm)) passwordConfirmError = 'Password confirmation must contain only letters and digits';
// 	if(_password && _confirm && _password != _confirm) passwordConfirmError = 'Error in password confirmation';
// 	return {usernameError, passwordError, passwordConfirmError}
// }