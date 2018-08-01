export default (username = '', password = '') => {
  const uname = username.trim();
  const psw = password.trim();
  let usernameError = '';
  let passwordError = '';
  if (uname === '') usernameError = 'Username is required';
  if (psw === '') passwordError = 'Password is required';
  if (/[^a-zA-Z0-9_-]/g.test(uname)) usernameError = 'Username must contain only letters, digits, underscore and hyphen';
  if (uname && !/[a-zA-Z0-9]/g.test(uname)) {
    usernameError = usernameError
      ? `${usernameError} and username `
      : 'Username ';
    usernameError += 'must contain at least one letter or digit';
  }
  if (/[^a-zA-Z0-9]/g.test(psw)) passwordError = 'Password must contain only letters and digits';
  return { usernameError, passwordError };
};
