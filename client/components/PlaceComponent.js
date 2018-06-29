import React, {Component} from 'react';
import injectSheet from 'react-jss';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  placeCart: {
    maxWidth: '100%',
    opacity: '.9',
    backgroundColor: '#FAFAFA',
    padding: '10px',
    marginTop: '10px',
    color: '#757575',
    cursor: 'pointer',
    transition: '.4s',
  },
  placeName: {
    color: '#000000',
  },
  rating: {
    color: '#039BE5',
  },
  button: {
    marginTop: '5px',
  },
  text: theme.typography.button,
  me: {
    color: 'red',
  },
})

const PlaceComponent = (props) => {
  const add = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.addToList(props.placeID); 
  }

  const remove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.removeFromList(props.placeID); 
  }

  const showList = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.showList(props.placeID)
  }
  const loginAndAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.loginAndAdd(props.placeID);
  }

  const cartClick = () => {
    const source = 'notmap';
    props.markerClick(props.placeID, source);
  }

  //make label about how many people are on the list of the specific bar
  //if current user also in the list - subtract from  the number and add label 'and me' or just 'me' 
  //if only current user in the list
  const goingNumber = props.isUserGoing ? props.usersInBar - 1 : props.usersInBar;    

  const GoingLabel = () => {
    return props.isUserGoing 
      ? goingNumber <= 0 
        ? (
          <span className={props.classes.me}>
            me
          </span>
        )
        : (
          <React.Fragment>
            {goingNumber} <span className={props.classes.me}> and me</span>
          </React.Fragment>
        )
      : <span>{goingNumber == 0 ? '-' : goingNumber}</span> 
  }
    
  return (
    <div 
      className={`${props.classes.placeCart} ${props.classes.text}`} 
      ref={props.cardRef} 
      onClick={cartClick} 
      style={props.isHighlighted ? {backgroundColor: '#E0E0E0'} : {}}
    >
      {props.photo && 
        <img src={props.photo}/>
      }
      <div className={props.classes.placeName}>
        {props.name}
      </div>
      <div>
        Address: {props.address}
      </div>
      { props.rating && 
        <div>Rating: <span className={props.classes.rating}>{props.rating}</span></div>
      }
      <div>
        Going: <GoingLabel />
      </div>
      { props.authenticated 
          ? ( 
            <React.Fragment>
              { props.isUserGoing 
                ? (
                  <div className={props.classes.button}>
                    <Button raised color="accent" dense={true} onClick={remove}>
                      Remove
                    </Button>
                  </div>
                ) 
                : (
                  <div className={props.classes.button}>
                    <Button raised color="accent" dense={true} onClick={add}>
                      Add
                    </Button>
                  </div>
                )
              }
              { goingNumber > 0 && 
                (
                  <div className={props.classes.button}>
                    <Button raised color="accent" dense={true} onClick={showList}>
                      List
                    </Button>
                  </div>
                )
              } 
            </React.Fragment>
          ) 
          : (
            <React.Fragment>
              <Button raised color="accent" dense={true} onClick={loginAndAdd}>
                Add
              </Button>
            </React.Fragment>
          )
        }
    </div>
  )
}

export default withStyles(styles)(PlaceComponent);