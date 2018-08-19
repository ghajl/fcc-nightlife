import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountBox from 'material-ui-icons/AccountBox';
import DirectionsWalk from 'material-ui-icons/DirectionsWalk';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Menu, { MenuItem } from 'material-ui/Menu';
import Badge from 'material-ui/Badge';
import { ListItem, ListItemIcon } from 'material-ui/List';
import BasketList from '../components/BasketList';

const styles = theme => ({
  nav: {
    overflow: 'hidden',
  },
  logo: {
    flex: 1,
    'text-transform': 'none',
    fontWeight: 900,
    fontSize: '1.5em',
    color: '#fff',
  },
  login: {
    margin: 5,
  },
  appBar: {
    background: '#110E0E',
    color: '#fff',
  },
  text: { ...theme.typography.button, ...{ color: 'white' } },
  basket: {
    color: 'white',
    '@media (min-width: 641px)': {
      marginRight: '2rem',
    },
  },
  popUpMenu: {
    background: '#110E0E',
  },
  icon: {
    fontSize: '1.6rem',
  },
  badge: {
    top: 1,
    right: -20,
    backgroundColor: 'green',
  },
});

class Header extends Component {
  constructor() {
    super();
    this.menuAnchorEl = null;
    this.basketAnchorEl = null;
  }

  handleMenu = (event) => {
    const { openLoginMenu } = this.props;
    event.preventDefault();
    openLoginMenu();
  };

  handleMenuClose = () => {
    const { closeLoginMenu } = this.props;
    closeLoginMenu();
  };

  handleLogOutClick = (event) => {
    const { logOut } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    logOut();
  };

  handleLogInClick = (event) => {
    const { openLoginDialog } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    openLoginDialog();
  };

  handleSignUpClick = (event) => {
    const { location, toSignUp } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    if (location.pathname !== '/signup') {
      toSignUp(location);
    }
  };

  showBasket = (event) => {
    const { showBasket } = this.props;
    event.preventDefault();
    this.basketAnchorEl = event.currentTarget;
    showBasket();
  };

  handleCloseBasketList = (event) => {
    const { closeBasket } = this.props;
    event.preventDefault();
    this.basketAnchorEl = null;
    closeBasket();
  };

  render() {
    const {
      classes,
      isAuthenticated,
      username,
      facebookProfile,
      loginMenuOpen,
      width,
      userBarsCount,
      basketList,
      basketOpen,
      removeBar,
    } = this.props;
    const authenticatedUserName = facebookProfile != null && facebookProfile.givenName != null
      ? facebookProfile.givenName
      : username || 'Registered User';
    return (
      <div className={classes.nav}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.logo} component={Link} to="/" type="title">
              BarCoordinator
            </Typography>
            { width === 'xs'
              ? (
                <IconButton
                  aria-owns={loginMenuOpen ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  buttonRef={(el) => { this.menuAnchorEl = el; }}
                  color="inherit"
                >
                  <AccountBox />
                </IconButton>
              )
              : (
                <React.Fragment>
                  {isAuthenticated
                    && (
                      <IconButton className={classes.basket} aria-label="Show my places" title="Show my places" onClick={this.showBasket}>
                        <Badge badgeContent={userBarsCount} color="primary" classes={{ badge: classes.badge }}>
                          <DirectionsWalk className={classes.icon} />
                        </Badge>
                      </IconButton>
                    )
                  }
                  <div className={classes.text}>
                    {`Hello, ${authenticatedUserName} !`}
                  </div>
                  <div className={classes.login}>
                    {isAuthenticated
                      ? (
                        <Button className={classes.text} component={Link} to="/logout" onClick={this.handleLogOutClick}>
                          LOG OUT
                        </Button>
                      )
                      : (
                        <React.Fragment>
                          <Button className={classes.text} onClick={this.handleLogInClick}>
                            LOG IN
                          </Button>
                          <Button className={classes.text} component={Link} to="/signup" onClick={this.handleSignUpClick}>
                            SIGN UP
                          </Button>
                        </React.Fragment>
                      )
                    }
                  </div>
                </React.Fragment>
              )
            }
            <Menu
              id="menu-appbar"
              classes={{ paper: classes.popUpMenu }}
              anchorEl={this.menuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={loginMenuOpen}
              onClose={this.handleMenuClose}
            >
              <ListItem className={classes.text}>
                {authenticatedUserName}
              </ListItem>
              {isAuthenticated
                ? (
                  <React.Fragment>
                    <MenuItem onClick={this.showBasket}>
                      <ListItemIcon className={classes.text} aria-label="Show my places" title="Show my places">
                        <Badge badgeContent={userBarsCount} color="primary" classes={{ badge: classes.badge }}>
                          <DirectionsWalk />
                        </Badge>
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem className={classes.text} component={Link} to="/logout" onClick={this.handleLogOutClick}>
                      LOG OUT
                    </MenuItem>
                  </React.Fragment>
                )
                : (
                  <React.Fragment>
                    <MenuItem className={classes.text} onClick={this.handleLogInClick}>
                      LOG IN
                    </MenuItem>
                    <MenuItem className={classes.text} component={Link} to="/signup" onClick={this.handleSignUpClick}>
                      SIGN UP
                    </MenuItem>
                  </React.Fragment>
                )
              }
            </Menu>
            <BasketList
              basketList={basketList}
              open={basketOpen}
              onClose={this.handleCloseBasketList}
              anchorEl={this.basketAnchorEl}
              removeBar={removeBar}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default compose(withStyles(styles), withWidth())(Header);

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  facebookProfile: PropTypes.shape({}),
  loginMenuOpen: PropTypes.bool.isRequired,
  basketOpen: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  userBarsCount: PropTypes.number.isRequired,
  basketList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showBasket: PropTypes.func.isRequired,
  closeBasket: PropTypes.func.isRequired,
  openLoginMenu: PropTypes.func.isRequired,
  closeLoginMenu: PropTypes.func.isRequired,
  removeBar: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  toSignUp: PropTypes.func.isRequired,
};

Header.defaultProps = {
  facebookProfile: {},
  username: '',
};
