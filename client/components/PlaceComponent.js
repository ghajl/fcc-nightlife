import React from 'react';
import injectSheet from 'react-jss';

const styles = {
	placeCart: {
		width: '400px',
		maxWidth: '80%',
		// height: 'auto',
		opacity: '.9',
		backgroundColor: 'white',
		boxShadow: '5px 1px 10px #888888',
		margin: '20px',
	}
}

const PlaceComponent = (props) => {


	return (
		<div className={props.classes.placeCart}>
			<div>{props.data.name}</div>
			<div>{props.data.vicinity}</div>
		</div>
	)

}

export default injectSheet(styles)(PlaceComponent);