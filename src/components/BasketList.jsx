import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Splitter from './Splitter';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui-icons/Clear';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';

const styles = {
  basket: {
    borderRadius: 0,
    'overflow-y': 'hidden',
    // height: '500px',
    minWidth: '200px',
    '@media (min-width: 450px)': {
      width: '400px',
    },
    '&>*': {
      padding: 0,
    },
  },
  container: {
    maxHeight: 'calc(100vh - 100px)',
    position: 'relative',
    'overflow-y': 'hidden',
    '@media (min-heght: 600px)': {
      maxHeight: '500px',
    },
  },
  basketHeader: {
    height: '48px',
    outline: 'none',
    background: '#211E1E',
    color: '#fff',
    justifyContent: 'center',
    paddingLeft: '16px',
  },
  basketTitle: {
    fontWeight: 900,
    fontSize: '1.5em',
  },
  list: {
    outline: 'none',
    marginTop: '48px',
    maxHeight: 'calc(100vh - 148px)',
    padding: 0,
    'overflow-y': 'auto',
    '@media (min-height: 600px)': {
      maxHeight: '452px',
    },
  },
  icon: {
    color: '#EA9A9A',
    fontSize: 36,
  },
  button: {
  },
  itemWrapper: {
    background: '#eee',
  },
  item: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  itemDetailsName: {
    fontSize: '1.4rem',
    color: '#1D9CF2',
  },
  itemDetailsAddress: {
    fontSize: '1rem',
    color: '#555',
  },
  itemDetailsEmptyBasket: {
    fontSize: '1.4rem',
    color: '#555',
  },
};

class BasketList extends PureComponent {
  renderItem = (bar) => {
    const {
      name, address, barId, placeId,
    } = bar;
    const { classes, removeBar } = this.props;
    const remove = (event) => {
      event.preventDefault();
      event.stopPropagation();
      removeBar(barId, placeId);
    };
    return (
      <div className={classes.item}>
        <div className={classes.itemDetails}>
          <div className={classes.itemDetailsName}>
            {name}
          </div>
          <div className={classes.itemDetailsAddress}>
            {address}
          </div>
        </div>
        <div className={classes.itemDetailsAction}>
          <IconButton className={classes.button} aria-label="Remove from list" title="Remove from list" onClick={remove}>
            <Clear className={classes.icon} />
          </IconButton>
        </div>
      </div>
    );
  };

  render() {
    const {
      basketList, classes, removeBar, ...props
    } = this.props;
    return (
      <Menu
        id="basket-menu"
        classes={{ paper: classes.basket }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...props}
      >
        <div className={classes.container}>
          <AppBar className={classes.basketHeader}>
            <Typography color="inherit" className={classes.basketTitle}>
              {'My Places'}
            </Typography>
          </AppBar>
          <List classes={{ root: classes.list }}>
            {basketList.length > 0
              ? basketList.map((bar, index) => (
                <div key={bar.barId}>
                  {index > 0 && (
                    <div style={{ background: '#eee' }}>
                      <Splitter style={{ width: '90%', height: '1px', minHeight: '1px' }} />
                    </div>
                  )}
                  <ListItem classes={{ root: classes.itemWrapper }}>
                    {this.renderItem(bar)}
                  </ListItem>
                </div>
              ))
              : (
                <ListItem classes={{ root: classes.itemWrapper }}>
                  <div className={classes.itemDetailsEmptyBasket}>
                    {'You have not yet chosen a bar'}
                  </div>
                </ListItem>
              )
            }
          </List>
        </div>
      </Menu>

    );
  }
}

export default withStyles(styles)(BasketList);

BasketList.propTypes = {
  basketList: PropTypes.arrayOf(PropTypes.shape({})),
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
  removeBar: PropTypes.func.isRequired,
};

BasketList.defaultProps = {
  basketList: [],
  classes: {},
};
