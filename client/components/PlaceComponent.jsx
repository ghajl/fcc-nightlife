import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  placeCard: {
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
});

const PlaceComponent = ({ placeID, classes, ...props }) => {
  const add = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { addToList } = props;
    addToList(placeID);
  };

  const remove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { removeFromList } = props;
    removeFromList(placeID);
  };

  const show = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { showList } = props;
    showList(placeID);
  };

  const loginAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { loginAndAdd } = props;
    loginAndAdd(placeID);
  };

  const cardClick = () => {
    const source = 'notmap';
    const { markerClick } = props;
    markerClick(placeID, source);
  };

  // make label about how many people are on the list of the specific bar
  // if current user also in the list - subtract from  the number
  // and add label 'and me' or just 'me'
  // if only current user in the list
  const getGoingCount = () => {
    const { isUserGoing, usersInBar } = props;
    return isUserGoing
      ? usersInBar - 1
      : usersInBar;
  };

  const GoingLabel = () => {
    const { isUserGoing } = props;
    const goingNumber = getGoingCount();
    const userOnTheListLabel = goingNumber <= 0
      ? (
        <span className={classes.me}>
          me
        </span>
      )
      : (
        <React.Fragment>
          {`${goingNumber} `}
          <span className={classes.me}>
            and me
          </span>
        </React.Fragment>
      );
    const userNotOnTheListLabel = goingNumber === 0 ? '-' : goingNumber;

    return isUserGoing
      ? userOnTheListLabel
      : (
        <span>
          {userNotOnTheListLabel}
        </span>
      );
  };

  const {
    cardRef, isHighlighted, photo, name, address, rating, authenticated, isUserGoing,
  } = props;
  return (
    <div
      className={`${classes.placeCard} ${classes.text}`}
      ref={cardRef}
      onClick={cardClick}
      style={isHighlighted ? { backgroundColor: '#E0E0E0' } : {}}
    >
      {photo
        && <img alt="" src={photo} />
      }
      <div className={classes.placeName}>
        {name}
      </div>
      <div>
        {'Address: '}
        {address}
      </div>
      {rating
        && (
          <div>
            {'Rating: '}
            <span className={classes.rating}>
              {rating}
            </span>
          </div>
        )
      }
      <div>
        {'Going: '}
        <GoingLabel />
      </div>
      {authenticated
        ? (
          <React.Fragment>
            {isUserGoing
              ? (
                <div className={classes.button}>
                  <Button raised color="accent" dense onClick={remove}>
                    Remove
                  </Button>
                </div>
              )
              : (
                <div className={classes.button}>
                  <Button raised color="accent" dense onClick={add}>
                    Add
                  </Button>
                </div>
              )
            }
            { getGoingCount() > 0
              && (
                <div className={classes.button}>
                  <Button raised color="accent" dense onClick={show}>
                    List
                  </Button>
                </div>
              )
            }
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <Button raised color="accent" dense onClick={loginAdd}>
                Add
            </Button>
          </React.Fragment>
        )
      }
    </div>
  );
};

export default withStyles(styles)(PlaceComponent);

PlaceComponent.propTypes = {
  classes: PropTypes.shape({
    me: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    placeName: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  photo: PropTypes.string,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number,
  authenticated: PropTypes.bool.isRequired,
  isUserGoing: PropTypes.bool.isRequired,
  usersInBar: PropTypes.number.isRequired,
  placeID: PropTypes.string.isRequired,
  addToList: PropTypes.func.isRequired,
  removeFromList: PropTypes.func.isRequired,
  showList: PropTypes.func.isRequired,
  loginAndAdd: PropTypes.func.isRequired,
  markerClick: PropTypes.func.isRequired,
};
