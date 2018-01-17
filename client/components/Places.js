import React from 'react';
import Header from '../containers/Header';
import MapComponent from '../containers/MapComponent'
import injectSheet from 'react-jss';
import SearchForm from '../containers/SearchForm';

const styles = {
    searchBar: {
		width: '400px',
		maxWidth: '80%',
		height: '120px',
		position: 'absolute',
		backgroundColor: 'white',
		opacity: '.9',
		top: '20%',
		left: '50%',
		boxShadow: '5px 1px 10px #888888',
		transform: 'translate(-50%, -50%)',	
		// overflow: 'hidden',
	},
	form: {
opacity: 1,
		width: '80%',
		padding: '10px',

	},
	map: {
		marginTop: '60px',
	}
}

const Places = (props) => {
	
	return (
  <div>
  	<Header />
  	<div className={props.classes.map}>
  	<MapComponent isMarkerShown />
  	</div>
  	<div className={props.classes.searchBar}>
  	<div className={props.classes.form}>
  	Hello!
  	
  	</div>
  	</div>
  </div>
)
}
export default injectSheet(styles)(Places);