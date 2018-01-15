import React from 'react'
import Header from '../containers/Header'
const Signup = (props) => {
	let usernameInput = null;
	let passwordInput = null;
	let passwordConfirmInput = null;
	const _onSignupSubmit = (event) => {		
		event.preventDefault()
		const username = usernameInput.value;
		const password = passwordInput.value;
		// const passwordConfirm = passwordConfirmInput.value;
		// Passed in via react-redux. Returns a promise.
		props.signUp({ // this function is passed in via react-redux
			username,
			password			
		}) // holds the path to redirect to after login (if any)
		

	};
	console.log(props);
	return (
	  <div>
	  	<Header />
	  	<div style={{marginTop:80}}>
			<h2>Sign Up</h2>		
			<form onSubmit={_onSignupSubmit}>
				<input type="text" ref={(input) => { usernameInput = input; }} placeholder="Username"/ ><br/>
				<input type="password" ref={(input) => { passwordInput = input; }} placeholder="Password" /><br/>
				<input type="submit" value="Submit" /> 
			</form>	
		</div>	
	  	
	  </div>
	)
}
export default Signup