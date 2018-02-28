import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';


class LoginDialog extends Component {
    constructor(){
        super();
        this.usernameInput = null;
        this.passwordInput = null;
    }

    submit = (event) => {
        event.preventDefault();
        
        const data = {
          username: this.usernameInput.value,
          password: this.passwordInput.value
        }
        
        this.props.onSubmit(data)
        
    }
    
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.submit(event);
        }
    }
    
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
                    <form>
                    <TextField
                        required
                        error={this.props.usernameErrorText.length > 0}
                        margin="dense"
                        id="username"
                        label="Username"
                        type="username"
                        helperText={this.props.usernameErrorText}
                        inputRef={(input) => { 
                            if(input) {
                                this.usernameInput = input; setTimeout(() => {this.usernameInput.focus()}, 300)}
                            }
                        }
                        fullWidth
                        onKeyPress={this.handleKeyPress}
                    />
                    <TextField
                        required
                        error={this.props.passwordErrorText.length > 0}
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        helperText={this.props.passwordErrorText}
                        inputRef={(input) => { this.passwordInput = input; }}
                        fullWidth
                        onKeyPress={this.handleKeyPress}
                    />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.submit} color="primary">
                        Log in
                    </Button>
                    <Button onClick={this.props.onSignUp} color="primary">
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