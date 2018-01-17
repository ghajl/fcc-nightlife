import React, {Component} from 'react';
import Header from '../containers/Header';
import MapComponent from '../containers/MapComponent';
import PlaceComponent from './PlaceComponent';
import injectSheet from 'react-jss';
import SearchForm from '../containers/SearchForm';

const styles = {
	root: {
		// display: 'flex',
		// overflow: 'auto',
	},
    placesList: {
		// width: '400px',
		// maxWidth: '80%',
		// height: '120px',
		float: 'left',
		// backgroundColor: 'white',
		// opacity: '.9',
		marginTop: - window.innerHeight - 60,
		paddingTop: '150px',
		// top: '0',
		// overflow: 'visible',
  // position: 'relative',
		// left: '0',
		// boxShadow: '5px 1px 10px #888888',
		// transform: 'translate(-50%, -50%)',	
		// overflow: 'hidden',
		marginLeft: '20px',
	},
	item: {
// opacity: 1,
// 		width: '80%',
// 		padding: '10px',

	margin: '20px',
	},
	map: {
		// overflow:'auto',
		height: '100%',
		marginTop: '60px',
	}
}


class Places extends Component{
	// constructor(props){
	// 	super(props);

	// }

	// shouldComponentUpdate(nextProps,nextState){
	// 	console.log(this.state.height !== nextState.height)
 //      return this.state.height !== nextState.height 
    
	// }
	
	setHeight(elem) {
		let height;
		if(elem){
				height = elem.clientHeight > window.innerHeight - 60  ? elem.clientHeight : window.innerHeight - 60;
				this.props.setHeight(height)
			}
	} 
	// console.log(height)
	render() {
		const bars = this.props.bars;
		const height = this.props.height;
		console.log(height) 
		console.log(height)
		return (
			<div className={this.props.classes.root} style={{height: height}}>
			  	<Header />
			  	<div className={this.props.classes.map}>
				  	<MapComponent 
				  		isMarkerShown 
				  		mapElement={<div style={{ height: height, opacity: '.8' }} />}
				  		/>
			  	</div>
			  	<div className={this.props.classes.placesList} ref={elem => this.setHeight(elem)}  style={{marginTop: - height - 60}}>
				  	{bars.map((item, index) =>
				  		
				        <PlaceComponent key={index}
				                  data={item} />
				        
				      )}
			  	
			  	
			  	
			  	
			  	</div>
			</div>
		)
	}
}
export default injectSheet(styles)(Places);