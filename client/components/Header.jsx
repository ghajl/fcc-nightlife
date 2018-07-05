import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountBox from 'material-ui-icons/AccountBox';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItem } from 'material-ui/List';

const styles = theme => ({
  nav: {
    overflow: 'hidden',
  },
  logo: {
    flex: 1,
    'text-transform': 'none',
    fontWeight: 900,
    fontSize: '1.5em',
  },
  login: {
    margin: 5,
  },
  text: theme.typography.button,
  title: {
    color: theme.palette.text.secondary,
  },
});

class Header extends Component {
  constructor() {
    super();
    this.menuAnchorEl = null;
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

  logout = (event) => {
    const { logOut } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    logOut();
  };

  toLogIn = (event) => {
    const { openLoginDialog } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    openLoginDialog();
  };

  signUp = (event) => {
    const { path, toSignUp } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    if (path.pathname !== '/signup') {
      toSignUp(path);
    }
  };

  render() {
    const {
      classes, isAuthenticated, username, facebookProfile, loginMenuOpen, width,
    } = this.props;
    const authenticatedUserName = facebookProfile != null && facebookProfile.givenName != null
      ? facebookProfile.givenName
      : username || 'Registered User';
    return (
      <div className={classes.nav}>
        <AppBar color="default">
          <Toolbar>
            <Typography className={classes.logo} color="secondary" component={Link} to="/" type="title">
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
                  <div className={classes.text}>
                    {`Hello, ${authenticatedUserName} !`}
                  </div>
                  <div className={classes.login}>
                    {isAuthenticated
                      ? (
                        <Button component={Link} to="/logout" onClick={this.logout}>
                          LOG OUT
                        </Button>
                      )
                      : (
                        <React.Fragment>
                          <Button onClick={this.toLogIn}>
                            LOG IN
                          </Button>
                          <Button component={Link} to="/signup" onClick={this.signUp}>
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
                  <MenuItem className={classes.text} component={Link} to="/logout" onClick={this.logout}>
                    LOG OUT
                  </MenuItem>
                )
                : (
                  <div>
                    <MenuItem className={classes.text} onClick={this.toLogIn}>
                      LOG IN
                    </MenuItem>
                    <MenuItem className={classes.text} component={Link} to="/signup" onClick={this.signUp}>
                      SIGN UP
                    </MenuItem>
                  </div>
                )
              }
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  path: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  facebookProfile: PropTypes.shape({}).isRequired,
  loginMenuOpen: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  openLoginMenu: PropTypes.func.isRequired,
  closeLoginMenu: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  toSignUp: PropTypes.func.isRequired,
};

export default compose(withStyles(styles), withWidth())(Header);
