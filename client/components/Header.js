import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    nav: {
    	display: 'flex',
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
})

const Header = ({classes, isAuthenticated, logOut, toSignUp, username, ...props}) => {
    const logout = (event) => {

        event.preventDefault();
        logOut();
    };
    const toLogIn = (event) => {

        event.preventDefault();
        props.openLoginDialog()
    };
    const signUp = (event) => {

        event.preventDefault();
        toSignUp(props.path);
    };
	return (
        <div className={classes.nav}>
        	<AppBar color="secondary">
        		<Toolbar>
					<Typography color="secondary" component={Link} to="/" type="title" className={classes.logo}>
		                BarCoordinator
		            </Typography>
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
        		</Toolbar>
        	</AppBar>
        	
        	
        </div>
    ) 
}

export default withStyles(styles)(Header);