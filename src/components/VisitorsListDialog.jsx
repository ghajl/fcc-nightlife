import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const VisitorsListDialog = ({ visitorsList, onClose, ...props }) => (
  <Dialog onClose={onClose} {...props}>
    <DialogTitle id="going-list">
      Who is going:
    </DialogTitle>
    <div>
      <List>
        {visitorsList.map(visitor => (
          <ListItem key={visitor}>
            <ListItemText primary={visitor} />
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

export default VisitorsListDialog;

VisitorsListDialog.propTypes = {
  visitorsList: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
};

VisitorsListDialog.defaultProps = {
  visitorsList: [],
};
