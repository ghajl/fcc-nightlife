import React, {Component} from 'react';
import Header from '../containers/Header';
import MapComponent from '../containers/MapComponent';
import PlaceComponent from '../containers/PlaceComponent';
import injectSheet from 'react-jss';
import SearchForm from '../containers/SearchForm';
import UsersListDialog from './UsersListDialog';
import qs from 'query-string';
import {defaultLocation} from '../../util/locations';



const styles = {
    placesList: {
		maxWidth: '80%',
		float: 'left',
		marginTop: - window.innerHeight - 60,
		paddingTop: '150px',
		marginLeft: '20px',
	},
	item: {
		margin: '20px',
	},
	map: {
		height: window.innerHeight - 60,
		marginTop: '60px',
		position: 'fixed',
		top: 0,
		width: '100%',
	},
	searchBar: {
		width: '400px',
		maxWidth: '80%',
		height: '120px',
		position: 'fixed',
		backgroundColor: 'white',
		top: '120px',
		'z-index': 1000,
		left: '80%',
		boxShadow: '5px 1px 10px #888888',
		transform: 'translate(-50%, -50%)',	
	},
	form: {
		opacity: 1,
		width: '80%',
		padding: '10px',
	},
}

class Places extends Component{
	constructor(props){
		super(props);
		this.placeLocation = qs.parse(props.location.search);
		//if there isn't parameter 'loc' in the url - replace url with default location
    	if(!this.placeLocation.loc){
    		props.replaceLocation(defaultLocation.address, props.location.pathname)
    	}
		
		this.state = {
		    open: false,
		    list: [],
		    height: window.innerHeight - 60 
	    };
	}
	
	//dialog with list of users that are going to the bar
	handleClickOpen = list => {
	    this.setState({
	      open: true,
	      list: list
	    });
	}
    
    handleClose = () => {
	    this.setState({ open: false, list: [] });
    }
	
	//show choosed bar on map and in list of bar cards
	markerClick = placeID => {
		this.props.highlightPlace(placeID);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.location.search != nextProps.location.search){
			
			this.placeLocation = qs.parse(nextProps.location.search);
			//if there is 'bar' parameter in url - show list of bars
			//if there is only 'loc' parameter - show location on the map
			if(!this.placeLocation.bar && this.placeLocation.loc){
		    	this.props.findLocation(this.placeLocation.loc);
		    } else if(this.placeLocation.bar && this.placeLocation.loc){
		    	this.props.showPlaces(this.service, this.placeLocation.loc);
		    }
		}
	}
	
	setMap = (el) => {
		if(!this.map){
			this.map = el
			this.service = new google.maps.places.PlacesService(this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
			this.placeLocation = qs.parse(this.props.location.search);
			if(this.placeLocation.bar && this.placeLocation.loc){
		    	this.props.showPlaces(this.service, this.placeLocation.loc);
		    }
		}
	}

	handleWindowSizeChange = () => {
    	this.setState({
	        height: window.innerHeight - 60 
	    });
    }
    
    componentWillMount(){
        window.addEventListener('resize', this.handleWindowSizeChange);
    }


	render() {
		const { classes, bars, location} = this.props;
		const height = window.innerHeight - 60;

		return (
			<div className={classes.root} style={{height: height}}>
			  	<div className={classes.map}>
				  	<MapComponent 
					  	isMarkerShown
				  		markers={bars}
				  		mapRef={el => this.setMap(el)}
			  			markerClick={this.markerClick}
			  			containerElement={<div style={{ height: this.state.height }} />}
				  		/>
			  	</div>
			  	<div className={this.props.classes.searchBar}>
			  	<div className={this.props.classes.form}>
			  	
			  	<SearchForm urlLocation={location} path={this.props.match.path} placeLocation={this.placeLocation.loc}/>
			  	</div>
			  	</div>
			  	<div className={classes.placesList} style={{marginTop: '60px'}}>
				  	{bars && bars.map((item, index) =>
				  		
				        <PlaceComponent 
				        	key={index}
				            data={item} 
				            path={this.props.match.url}
				            openShowListDialog={this.handleClickOpen}	
	            			markerClick={this.markerClick}
				            />
				        
				      )}
			  	
			  	
			  	
			  	
			  	</div>
			  	<UsersListDialog
            	usersList={this.state.list}
            	open={this.state.open}
	            onClose={this.handleClose}
	        />
	        
			</div>
		)
	}
}
export default injectSheet(styles)(Places);