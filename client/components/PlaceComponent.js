import React from 'react';
import injectSheet from 'react-jss';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
const styles = theme => ({
	placeCart: {
		width: '400px',
		maxWidth: '80%',
		// height: 'auto',
		opacity: '.9',
		backgroundColor: 'white',
		boxShadow: '5px 1px 10px #888888',
		margin: '20px',
		padding: '10px',
		 color: "#673AB7"
	},
	button: {
		marginTop: "5px"
	},
	text: theme.typography.button,
})

const PlaceComponent = (props) => {
	console.log(props)
    const _logout = (event) => {

        event.preventDefault();
        // logOut();
        const data = {
        	placeID: props.data.id,
        	username: props.username
        }
		// const password = passwordInput.value;
		// const passwordConfirm = passwordConfirmInput.value;
		// Passed in via react-redux. Returns a promise.
		props.addPlace(data); 
    };

	return (
		<div className={`${props.classes.placeCart} ${props.classes.text}`}>
			<div>{props.data.name}</div>
			<div>Address: {props.data.vicinity}</div>
			{ props.data.rating ? (<div>Rating: {props.data.rating}</div>) : (<div></div>)}
			{ props.authenticated ? (<div className={props.classes.button}>
									<Button raised color="accent" dense={true} onClick={_logout}>
						                Add
						            </Button>
						            </div>) : (<div></div>)}
		</div>
	)

}

export default withStyles(styles)(PlaceComponent);