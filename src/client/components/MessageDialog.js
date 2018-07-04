import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const styles = {
    button: {
        alignSelf: 'center'
    }
};


class MessageDialog extends Component {

    render() {
        const { classes } = this.props;
            return (
                <Dialog
                  open={this.props.open}
                  onClose={this.props.onClose}
                  
                >
                    <DialogContent>
                      
                        {this.props.message.map((msg, index) => {
                            return (
                                <DialogContentText key={index} id="alert-dialog-description">
                                {msg}
                                </DialogContentText>
                            )
                        })}
                      
                    </DialogContent>
                    <DialogActions className={classes.button}>
                        <Button raised onClick={this.props.onClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
          
        );
    }
}

export default withStyles(styles)(MessageDialog)