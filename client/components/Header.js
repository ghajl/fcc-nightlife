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
    	color: 'blue',
    },
    logo: {
    	flex: 1,
    	'text-transform': 'none',
    	fontWeight: 900,
    	fontSize: '1.5em',
    },
    login: {
    	margin: 5,
    	// alignSelf: 'flex-end',
    },
    text: theme.typography.button,
})

const Header = ({classes, isAuthenticated, logOut, username}) => {
    const _logout = (event) => {

        event.preventDefault();
        logOut();
    };

	return (
        <div className={classes.nav}>
        	<AppBar color="default">
        		<Toolbar>
					<Typography color="primary" component={Link} to="/" type="title" className={classes.logo}>
		                NightLife
		            </Typography>
                    <div className={classes.text}>Hello, {username}!</div>
		            <div className={classes.login}>
                        {isAuthenticated ? (

                                <Button component={Link} to="/logout" onClick={_logout}>
                                    LOG OUT
                                </Button>
                                ) : (
                                <React.Fragment>
                                    <Button component={Link} to="/login">
                                        LOG IN
                                    </Button>
                                    <Button component={Link} to="/signup">
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