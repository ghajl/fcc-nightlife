import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
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
})

class Header extends Component{
    constructor(){
        super();
        this.menuAnchorEl = null;
    }

    handleMenu = event => {
        event.preventDefault();
        this.props.openLoginMenu();
    };

    handleMenuClose = () => {
        this.props.closeLoginMenu();
        
    };
    

    logout = (event) => {

        event.preventDefault();
        this.handleMenuClose()
        this.props.logOut();
    };
    
    toLogIn = (event) => {

        event.preventDefault();
        this.handleMenuClose()
        this.props.openLoginDialog()
        
    };
    
    signUp = (event) => {

        event.preventDefault();
        this.handleMenuClose();
        if(this.props.path.pathname != '/signup') this.props.toSignUp(this.props.path);
        
    };

    render() {
        const {classes, isAuthenticated, username, facebookProfile, facebookID, ...props} = this.props;
        const authenticatedUserName = facebookID != undefined ? facebookProfile && facebookProfile.givenName || facebookProfile.displayName || 'Facebook User'
                                                                : username;
        const open = props.loginMenuOpen;
        return (
        <div className={classes.nav}>
        	<AppBar color="default">
        		<Toolbar>
					<Typography color="secondary" component={Link} to="/" type="title" className={classes.logo}>
		                BarCoordinator
		            </Typography>
                    { props.width == 'xs' ? (
                        <IconButton
                          aria-owns={open ? 'menu-appbar' : null}
                          aria-haspopup="true"
                          onClick={this.handleMenu}
                          buttonRef={(el) => { this.menuAnchorEl = el; }}
                          color="inherit"
                        >
                          <AccountBox />
                        </IconButton>
                        ) : (
                        <React.Fragment>
                        <div className={classes.text}>Hello, {username}!</div>
                        <div className={classes.login}>
                            {isAuthenticated ? (

                                    <Button component={Link} to="/logout" onClick={this.logout}>
                                        LOG OUT
                                    </Button>
                                    ) : (
                                    <React.Fragment>
                                        <Button onClick={this.toLogIn}>
                                            LOG IN
                                        </Button>
                                        <Button component={Link} to="/signup" onClick={this.signUp}>
                                            SIGN UP
                                        </Button>
                                    </React.Fragment>
                                    )}
                            
                            
                        </div>
                        
                        </React.Fragment>
                        )}

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
                        open={open}
                        onClose={this.handleMenuClose}

                    >
                        <ListItem className={classes.text}>{username}</ListItem>
                        {isAuthenticated ? (
                            <MenuItem component={Link} to="/logout" onClick={this.logout} className={classes.text}>LOG OUT</MenuItem>
                            
                            ) : (
                            <div>
                                <MenuItem onClick={this.toLogIn} className={classes.text}>LOG IN</MenuItem>
                                
                                <MenuItem  component={Link} to="/signup" onClick={this.signUp} className={classes.text}>SIGN UP</MenuItem>
                                
                            </div>
                        )}
                    </Menu>
        		</Toolbar>
        	</AppBar>
        	
        	
        </div>
        ) 
    }
}

export default compose(withStyles(styles), withWidth())(Header);