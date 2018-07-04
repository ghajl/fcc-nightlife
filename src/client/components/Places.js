import React, {Component} from 'react';
import Header from '../containers/Header';
import MapComponent from '../containers/MapComponent';
import PlaceComponent from '../containers/PlaceComponent';
import injectSheet from 'react-jss';
import SearchForm from '../containers/SearchForm';
import UsersListDialog from './UsersListDialog';
import qs from 'query-string';
import {defaultLocation} from '../../util/locations';
import Grid from 'material-ui/Grid';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Page from './Page';



const styles = {
	root: {
  		flex: '1 0 auto', 
		display: 'flex',
		'@media (max-width: 640px)': {
            flexDirection: 'column',
        },
        marginTop: '60px',
		'@media (max-width: 600px)': {
            marginTop: '50px',
        },
		// alignItems: 'stretch'
  //       
	},
    placesList: {
		maxWidth: '100%',
		
		'@media (min-width: 641px)': {
            borderRight: '.5rem solid #A8C256',
            width: '400px',
        },
		'@media (max-width: 640px)': {
            width: '100%',
            flex: '1 0 auto', 
        },
	},
	carts: {
		marginTop: '125px',
  		'@media (min-width: 641px)': {
            'overflow-y': 'scroll',
            marginTop: '120px',
        },
        '@media (max-width: 640px)': {
            marginTop: 0,
        },
	},
	item: {
		margin: '20px',
	},
	map: {
		flexGrow: 1,
		// marginTop: '60px',
		'@media (max-width: 640px)': {
            width: 0,
            height: 0,
        },
	},
	searchBar: {
		width: '100%',
		height: '120px',
		position: 'fixed',
		backgroundColor: 'white',
		maxWidth: '100%',
		top: '50px',
		'z-index': 1000,
		boxShadow: '1px 1px 10px #888888',
		'@media (min-width: 600px)': {
            top: '60px',
        },
        '@media (min-width: 641px)': {
            width: 'inherit',
        },
        '@media (max-width: 640px)': {
            position: 'relative',
            top: 0,
        },
	},
	form: {
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
		    height: window.innerHeight - this.getMargin() 
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

	getMargin = () => {
		return this.props.width == 'xs' ? 50 : 60
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
	        height: window.innerHeight - this.getMargin() 
	    });
    }
    
    componentWillMount(){
        window.addEventListener('resize', this.handleWindowSizeChange);
    }


	render() {
		const { classes, bars, location} = this.props;
		const {height} = this.state;
		const sectionStyle = window.innerWidth <= 640 ? { flex: '1 0 auto',display: 'flex', flexDirection: 'column', } : { height: height - this.props.footerHeight}
		const listStyle = window.innerWidth <= 640 ? { flex: '1 0 auto' } : { height: height - 120 - this.props.footerHeight}
		const mapStyle = window.innerWidth <= 640 ? { height: 0 } : { height: height - this.props.footerHeight}
		return (
			<Page location={location}>
			<div className={classes.root}>
				<div className={classes.placesList} style={sectionStyle}>
			        <div className={classes.searchBar}>
					  	<div className={classes.form}>
					  	
					  	<SearchForm urlLocation={location} path={this.props.match.path} placeLocation={this.placeLocation.loc}/>
					  	</div>
				  	</div>
				  	<div className={classes.carts} style={listStyle}>
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
			  	</div>
			  	<div className={classes.map} style={mapStyle}>
				  	<MapComponent 
					  	isMarkerShown
				  		markers={bars}
				  		mapRef={el => this.setMap(el)}
			  			markerClick={this.markerClick}
			  			containerElement={<div style={{ height: 'inherit', width: 'inherit' }} />}
				  		/>
			  	</div>
			  	
			  	<UsersListDialog
            	usersList={this.state.list}
            	open={this.state.open}
	            onClose={this.handleClose}
	        />
	        </div>
			</Page>
		)
	}
}
export default compose(injectSheet(styles), withWidth())(Places);