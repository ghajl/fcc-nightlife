import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import uuidv1 from 'uuid/v1';

const styles = {
  button: {
    alignSelf: 'center',
  },
};

const MessageDialog = ({
  classes, open, onClose, message,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogContent>
      {message
        && message.map((msg) => {
          const key = uuidv1();
          return (
            <DialogContentText key={key}>
              {msg}
            </DialogContentText>
          );
        })
      }
    </DialogContent>
    <DialogActions className={classes.button}>
      <Button raised onClick={onClose} color="primary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default withStyles(styles)(MessageDialog);

MessageDialog.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
};
