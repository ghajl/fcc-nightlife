import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';


class UsersListDialog extends Component {
  constructor(props){
    super(props);

  // }
    this.handleClose = this.handleClose.bind(this);
    
  }


   handleClose() {
    this.props.onClose();
  };

  
  render() {
    const { onClose, usersList, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} {...other}>
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
      </Dialog>
    );
  }
}

export default UsersListDialog;