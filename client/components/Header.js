import React from 'react';
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
import { ListItem, ListItemText } from 'material-ui/List';
const styles = theme => ({
    nav: {
    	flexGrow: 1,
    	width:'100%',
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

const Header = ({classes, isAuthenticated, logOut, toSignUp, username, ...props}) => {
    const logout = (event) => {

        event.preventDefault();
        props.handleMenuClose()
        logOut();
    };
    const toLogIn = (event) => {

        event.preventDefault();
        props.handleMenuClose()
        props.openLoginDialog()
    };
    const signUp = (event) => {

        event.preventDefault();
        props.handleMenuClose()
        toSignUp(props.path);
    };
	return (
        <div className={classes.nav}>
        	<AppBar color="secondary">
        		<Toolbar>
					<Typography color="secondary" component={Link} to="/" type="title" className={classes.logo}>
		                BarCoordinator
		            </Typography>
                    { props.width == 'xs' ? (
                        <IconButton
                          aria-owns={props.open ? 'menu-appbar' : null}
                          aria-haspopup="true"
                          onClick={props.handleMenu}
                          color="inherit"
                        >
                          <AccountBox />
                        </IconButton>
                        ) : (
                        <React.Fragment>
                        <div className={classes.text}>Hello, {username}!</div>
                        <div className={classes.login}>
                            {isAuthenticated ? (

                                    <Button component={Link} to="/logout" onClick={logout}>
                                        LOG OUT
                                    </Button>
                                    ) : (
                                    <React.Fragment>
                                        <Button onClick={toLogIn}>
                                            LOG IN
                                        </Button>
                                        <Button component={Link} to="/signup" onClick={signUp}>
                                            SIGN UP
                                        </Button>
                                    </React.Fragment>
                                    )}
                            
                            
                        </div>
                        
                        </React.Fragment>
                        )}

                    <Menu
                        id="menu-appbar"
                        anchorEl={props.menuAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={props.open}
                        onClose={props.handleMenuClose}
                    >
                        <ListItem className={classes.text}>{username}</ListItem>
                        {isAuthenticated ? (
                                    <MenuItem selected={true} component={Link} to="/logout" onClick={logout} className={classes.text}>LOG OUT</MenuItem>
                                    
                                    ) : (
                                    <div>
                                        <MenuItem selected={true} onClick={toLogIn} className={classes.text}>LOG IN</MenuItem>
                                        
                                        <MenuItem  component={Link} to="/signup" onClick={signUp} className={classes.text}>SIGN UP</MenuItem>
                                        
                                    </div>
                                    )}
                    </Menu>
        		</Toolbar>
        	</AppBar>
        	
        	
        </div>
    ) 
}

export default compose(withStyles(styles), withWidth())(Header);