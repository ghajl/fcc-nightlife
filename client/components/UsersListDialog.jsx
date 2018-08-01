import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const UsersListDialog = ({ usersList, onClose, ...props }) => (
  <Dialog onClose={onClose} {...props}>
    <DialogTitle id="going-list">
      Who is going:
    </DialogTitle>
    <div>
      <List>
        {usersList.map(user => (
          <ListItem key={user}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </div>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default UsersListDialog;

UsersListDialog.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({})),
  onClose: PropTypes.func.isRequired,
};

UsersListDialog.defaultProps = {
  usersList: [],
};
