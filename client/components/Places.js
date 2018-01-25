import React, {Component} from 'react';
import Header from '../containers/Header';
import MapComponent from '../containers/MapComponent';
import PlaceComponent from '../containers/PlaceComponent';
import injectSheet from 'react-jss';
import SearchForm from '../containers/SearchForm';
import UsersListDialog from './UsersListDialog';

const styles = {
	root: {
		// display: 'flex',
		// overflow: 'auto',
	},
    placesList: {
		// width: '400px',
		maxWidth: '80%',
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

// const Places = (props) => {
class Places extends Component{
	constructor(props){
		super(props);

	// }
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		 this.state = {
	    open: false,
	    list: []
	  };
	}
  handleClickOpen(list) {
    this.setState({
      open: true,
      list: list
    });
  }
    handleClose() {
    this.setState({ open: false, list: [] });
  }

	// shouldComponentUpdate(nextProps,nextState){
	// 	let idList = this.props.bars.map(item => item.id).sort()
	// 	let newIdList = nextProps.bars.map(item => item.id).sort()
		
	// 	return JSON.stringify(idList) !== JSON.stringify(newIdList)
    
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
		const { classes, bars, location} = this.props;
		// const bars = props.bars;
		const height = window.innerHeight - 60;
		// console.log(this.props) 
		console.log("height")
		return (
			<div className={classes.root} style={{height: height}}>
			  	<div className={classes.map}>
				  	<MapComponent 
					  	isMarkerShown
				  		markers={bars.map(item => item.location)}
				  		
				  		/>
			  	</div>
			  	<div className={classes.placesList} style={{marginTop: '60px'}}>
				  	{bars.map((item, index) =>
				  		
				        <PlaceComponent 
				        	key={index}
				            data={item} 
				            locationPathname={location.pathname}
				            openShowListDialog={this.handleClickOpen}	
	            
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