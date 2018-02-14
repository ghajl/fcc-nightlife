import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';



const UsersListDialog = (props) => {

    const { usersList, ...other } = props;

    return (
      <Dialog onClose={props.onClose} {...other}>
        <DialogTitle id="going-list">Who is going:</DialogTitle>
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
          <Button onClick={props.onClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  
}

export default UsersListDialog;