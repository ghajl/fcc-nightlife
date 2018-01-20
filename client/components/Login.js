import React from 'react'
import Header from '../containers/Header'


const Login = (props) => {
	let usernameInput = null;
	let passwordInput = null;
	const _onLoginSubmit = (event) => {		
		event.preventDefault()
		const username = usernameInput.value
		const password = passwordInput.value

		// Passed in via react-redux. Returns a promise.
		props.manualLogin({ // this function is passed in via react-redux
			username,
			password			
		}) // holds the path to redirect to after login (if any)
		

	};
	console.log(props);
	return (
  <div>
  	<div style={{marginTop:80}}>
		<h2>Log in</h2>		
		<form onSubmit={_onLoginSubmit}>
			<input type="username" ref={(input) => { usernameInput = input; }} placeholder="Username"/><br/>
			<input type="password" ref={(input) => { passwordInput = input; }} placeholder="Password" /><br/>
			<input type="submit" value="Login" /> 
		</form>	
	</div>	
  	
  </div>
)
}


export default Login