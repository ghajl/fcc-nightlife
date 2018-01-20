import React, {Component} from 'react';
import Header from '../containers/Header';
import HomeMap from '../containers/HomeMap'
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

class Home extends Component{
	constructor(props){
		super(props);
		// this.map = null;
	}

	submitSearch(address){

		const service = new google.maps.places.PlacesService(this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
		// const lat = this.map.props.center.lat;
		// const lng = this.map.props.center.lng;
		// console.log(this.map.props)
		this.props.showPlaces(service);
	}

	render() {
	
		return (
		  <div>
		  	<div className={this.props.classes.map}>
		  	<HomeMap mapRef={el => {this.map = el}} isMarkerShown />
		  	</div>
		  	<div className={this.props.classes.searchBar}>
		  	<div className={this.props.classes.form}>
		  	Enter your location:
		  	<SearchForm submitSearch={(adr) => this.submitSearch(adr)} />
		  	</div>
		  	</div>
		  </div>
		)
	}
}
export default injectSheet(styles)(Home);

// <div>
//   	<MapComponent isMarkerShown={false} />
//   	</div>