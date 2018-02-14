import React, {Component} from 'react';
import injectSheet from 'react-jss';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	placeCart: {
		width: '300px',
		maxWidth: '80%',
		opacity: '.9',
		boxShadow: '5px 1px 10px #888888',
		margin: '20px',
		padding: '10px',
		color: "#673AB7",
		cursor: 'pointer'
	},
	button: {
		marginTop: "5px"
	},
	text: theme.typography.button,
	me: {
		color: 'red'
	},
	
})


const PlaceComponent = (props) => {

    const add = (event) => {

        event.preventDefault();
        event.stopPropagation();
        const data = {
        	placeID: props.placeID,
        	username: props.username,

        }
		props.addToList(data); 
    }

    const remove = (event) => {

        event.preventDefault();
        event.stopPropagation();
        const data = {
        	placeID: props.placeID,
        	username: props.username,

        }
		props.removeFromList(data); 
    }
	
	const usersList = () => {
    	if (props.isUserGoing) {
    		let i = props.usersInBar.indexOf(props.username);
    		let list = [...props.usersInBar];
    		list.splice(i, 1);
    		return list;
    	} else 
    		return props.usersInBar
    	
    	
    }
    
    const showList = (event) => {
    	event.preventDefault();
        event.stopPropagation();
        props.openShowListDialog(usersList())
    }
    const loginAndAdd = (event) => {

        event.preventDefault();
        event.stopPropagation();
        props.loginAndAdd(props.placeID);
    }
	const cartClick = () => {

        props.markerClick(props.placeID);
    }

    //make label about how many people are going to specific bar
    //if current user also is going - subtract from  the number and add label 'and me' or just 'me' 
    //if only he is only one in the list
    const goingNumber = props.isUserGoing ? props.usersInBar.length - 1 : props.usersInBar.length;    
    const GoingLabel = () => {
    	
    	return props.isUserGoing ? goingNumber <= 0 ? 
	    					
	    						<span className={props.classes.me}>me</span>
	    					: 
	    						<React.Fragment>{goingNumber} <span className={props.classes.me}> and me</span></React.Fragment>
	    					: 
	    						<span>{goingNumber}</span>	
    }
    
    return (

		<div onClick={cartClick} className={`${props.classes.placeCart} ${props.classes.text}`} style={props.isHighlighted ? {backgroundColor: 'palegreen'} : {backgroundColor: 'white'}}>
		
			{props.photo && 
			<img src={props.photo}/>
			}
			
			<div>{props.name}</div>
			<div>Address: {props.address}</div>
			{ props.rating && <div>Rating: {props.rating}</div>}
			<div>Going: <GoingLabel /></div>
			{ props.authenticated ? ( <div>
				{props.isUserGoing ? (
					<div className={props.classes.button}>
									<Button raised color="accent" dense={true} onClick={remove}>
						                Remove
						            </Button>
						            
						            </div>
					            ) : (
								<div className={props.classes.button}>
									<Button raised color="accent" dense={true} onClick={add}>
						                Add
						            </Button>
						            
						            </div>)}
					            
						            	{goingNumber > 0 && 
						            	(<div className={props.classes.button}>
						            		<Button raised color="accent" dense={true} onClick={showList}>
								                List
								            </Button>
						            	</div>)}	
						            
						            </div>
				            ) : (
				            <div><Button raised color="accent" dense={true} onClick={loginAndAdd}>
				                Add
				            </Button></div>)}
            
            
		</div>

	)
}


export default withStyles(styles)(PlaceComponent);