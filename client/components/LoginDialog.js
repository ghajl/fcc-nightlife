import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class LoginDialog extends Component {
  // state = {
  //   open: false,
  // };
constructor(props){
    super(props);
    // this.map = null;
    this.usernameInput = null;
    this.passwordInput = null;
}
  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };
  // constructor(props){
  //   super(props);

  // }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
  //   state = {
  //       username: "",
  //       password: ""
  // }
// }
// state = {
//     name: 'Cat in the Hat',
//     age: '',
//     multiline: 'Controlled',
//     currency: 'EUR',
//   };
    submit = (event) => {
        event.preventDefault();
        console.log(this.usernameInput.value)
        const data = {
          username: this.usernameInput.value,
          password: this.passwordInput.value
        }
        this.props.onSubmit(data)
        // this.setState({username: "",
        //     password: ""})
        // console.log(this.state['username'] + " " + this.state['password'])
        // this.props.onClose()
    }


  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };
    render() {
        return (
          <div>
            <Dialog
              open={this.props.open}
              onClose={this.props.onClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Log in</DialogTitle>
              <DialogContent>
              <form >
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="username"
                  helperText={this.props.usernameErrorText}
                  inputRef={(input) => { this.usernameInput = input; }}
                  fullWidth
                />
                <TextField
                  required
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  helperText={this.props.passwordErrorText}
                  inputRef={(input) => { this.passwordInput = input; }}
                  fullWidth
                />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.submit} color="primary">
                  Log in
                </Button>
                <Button onClick={this.props.onClose} color="primary">
                   Or, sign up
                </Button>
                <Button onClick={this.props.onClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}

export default LoginDialog