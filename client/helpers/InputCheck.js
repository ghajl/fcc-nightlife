export default (username = '', password = '') => {

	const _username = username.trim();
	const _password = password.trim();
	let usernameError = '';
	let passwordError = '';
	if(_username == '') usernameError = 'Username is required';
	if(_password == '') passwordError = 'Password is required';
	if(/[^a-zA-Z0-9_\-]/g.test(_username)) usernameError = 'Username must contain only letters, digits, underscore and hyphen';
	if(_username && !/[a-zA-Z0-9]/g.test(_username)){
		usernameError = usernameError ? usernameError + ' and username '
									: 'Username ';
		usernameError +=  'must contain at least one letter or digit';
	} 
	if(/[^a-zA-Z0-9]/g.test(_password)) passwordError = 'Password must contain only letters and digits';
	return {usernameError, passwordError}
}