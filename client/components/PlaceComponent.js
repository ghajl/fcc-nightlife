import React, {Component} from 'react';
import injectSheet from 'react-jss';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	placeCart: {

		width: '600px',
		maxWidth: '80%',
		// height: 'auto',
		opacity: '.9',
		backgroundColor: 'white',
		boxShadow: '5px 1px 10px #888888',
		margin: '20px',
		padding: '10px',
		 color: "#673AB7"
	},
	button: {
		marginTop: "5px"
	},
	text: theme.typography.button,
	me: {
		color: 'red'
	},
	image: {
		// display: 'inline-block'
	},
	desc: {
		// display: 'inline-block'
	}
})


const PlaceComponent = (props) => {

    const _add = (event) => {

        event.preventDefault();
        const data = {
        	placeID: props.placeID,
        	username: props.username,

        }
		props.addPlace(data); 
    }

    const _remove = (event) => {

        event.preventDefault();
        const data = {
        	placeID: props.placeID,
        	username: props.username,

        }
		props.removePlace(data); 
    }

    const _loginAndAdd = (event) => {

        event.preventDefault();
        
        props.loginAndAdd(props.locationPathname, props.placeID);
    }

    const goingNumber = props.isUserGoing ? props.usersInBar.length - 1 : props.usersInBar.length;    
    const GoingLabel = () => {
    	//({'maxWidth': 100, 'maxHeight': 100})
    	// if(props.photo){
    	// 	console.log(props.photo.getUrl({'maxWidth': 200, 'maxHeight': 200}))
    	// }
    	// console.log(props.photo)
    	
    	return props.isUserGoing ? goingNumber <= 0 ? 
	    					
	    						<span className={props.classes.me}>me</span>
	    					: 
	    						<React.Fragment>{goingNumber} <span className={props.classes.me}> and me</span></React.Fragment>
	    					 : 
	    						<span>{goingNumber}</span>	
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

	return (
		<div className={`${props.classes.placeCart} ${props.classes.text}`}>

			{props.photo && <div className={props.classes.image}>
			<img src={props.photo}/>
			</div>}
			<div className={props.classes.desc}>
			<div>{props.name}</div>
			<div>Address: {props.address}</div>
			{ props.rating ? (<div>Rating: {props.rating}</div>) : (<div></div>)}
			<div>Going: <GoingLabel /></div>
			{ props.authenticated ? ( <div>
				{props.isUserGoing ? (
					<div className={props.classes.button}>
									<Button raised color="accent" dense={true} onClick={_remove}>
						                Remove
						            </Button>
						            
						            </div>
					            ) : (
								<div className={props.classes.button}>
									<Button raised color="accent" dense={true} onClick={_add}>
						                Add
						            </Button>
						            
						            </div>)}
					            
						            	{goingNumber > 0 && 
						            	(<div className={props.classes.button}>
						            		<Button raised color="accent" dense={true} onClick={() => props.openShowListDialog(usersList())}>
								                show
								            </Button>
						            	</div>)}	
						            
						            </div>)
				            : (<div><Button raised color="accent" dense={true} onClick={props.openLoginDialog}>
						                Add
						            </Button></div>)}
            </div>
            
		</div>
	)
}


export default withStyles(styles)(PlaceComponent);