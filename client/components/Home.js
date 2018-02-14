import React, {Component} from 'react';
import Header from '../containers/Header';
import HomeMap from '../containers/HomeMap'
import injectSheet from 'react-jss';
import SearchForm from '../containers/SearchForm';
import qs from 'query-string';
import {defaultLocation} from '../../util/locations';
 

const styles = {
    searchBar: {
		width: '400px',
		maxWidth: '80%',
		height: '120px',
		position: 'absolute',
		backgroundColor: 'white',
		opacity: '.9',
		top: '120px',
		left: '50%',
		boxShadow: '5px 1px 10px #888888',
		transform: 'translate(-50%, -50%)',	
		
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
		
		this.location = qs.parse(props.location.search);
    	
    	//set location from url
    	if(!this.location.loc){
    		props.replaceLocation(defaultLocation.address, props.location.pathname)
    	} else {
    		props.findLocation(this.location.loc);
    	}
    	this.state = {
		    height: window.innerHeight - 60 
	    };
	}

	
	componentWillReceiveProps(nextProps){
		if(this.props.location.search != nextProps.location.search){

			this.location = qs.parse(nextProps.location.search);
	
			//set location from url
	    	if(!this.location.loc){
	    		this.props.replaceLocation(defaultLocation.address, this.props.location.pathname)
	    	} else {
	    		this.props.findLocation(this.location.loc);
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
		return (
			<div>
			  	<div className={this.props.classes.map}>
			  	<HomeMap 
			  		isMarkerShown
			  		containerElement={<div style={{ height: this.state.height }} />}
        		/>
			  	</div>
			  	<div className={this.props.classes.searchBar}>
				  	<div className={this.props.classes.form}>
				  	<SearchForm urlLocation={this.props.location} path={this.props.match.path} placeLocation={this.location.loc} />
				  	</div>
			  	</div>
			  	
			</div>
		)
	}
}

export default injectSheet(styles)(Home);
