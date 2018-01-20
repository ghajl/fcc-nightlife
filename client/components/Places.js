import React, {Component} from 'react';
import Header from '../containers/Header';
import MapComponent from '../containers/MapComponent';
import PlaceComponent from '../containers/PlaceComponent';
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
		
		height: window.innerHeight - 60,
		marginTop: '60px',
		position: 'fixed',
		top: 0,
		width: '100%',
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
	
	// setHeight(elem) {
	// 	let height;
	// 	if(elem){
	// 			height =  window.innerHeight - 60;
	// 			this.props.setHeight(height)
	// 		}
	// } 
	// console.log(height)
	render() {
		const bars = this.props.bars;
		const height = window.innerHeight - 60;
		console.log(bars) 
		// console.log(height)
		return (
			<div className={this.props.classes.root} style={{height: height}}>
			  	<div className={this.props.classes.map}>
				  	<MapComponent 
					  	isMarkerShown
				  		markers={bars.map(item => item.geometry.location)}
				  		
				  		/>
			  	</div>
			  	<div className={this.props.classes.placesList} style={{marginTop: '60px'}}>
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