export default (username = '', password = '', confirm = '') => {

	let _username = username.trim();
	let _password = password.trim();
	let _confirm = confirm.trim();
	let usernameError = '';
	let passwordError = '';
	let passwordConfirmError = '';
	if(_username == '') usernameError = 'Username is required';
	if(_password == '') passwordError = 'Password is required';
	if(_confirm == '') passwordConfirmError = 'Password confirmation is required';
	if(/[^a-zA-Z0-9_.]/g.test(_username)) usernameError = 'Username must contain only letters, digits, underscore and period';
	if(_username && !/[a-zA-Z0-9]/g.test(_username)) usernameError = 'Username must contain at least one letter or digit';
	if(/[^a-zA-Z0-9]/g.test(_password)) passwordError = 'Password must contain only letters and digits';
	if(/[^a-zA-Z0-9]/g.test(_confirm)) passwordConfirmError = 'Password confirmation must contain only letters and digits';
	if(_password && _confirm && _password != _confirm) passwordConfirmError = 'Error in password confirmation';
	return {usernameError, passwordError, passwordConfirmError}
}