import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import uuidv1 from 'uuid/v1';
import { withStyles } from 'material-ui/styles';
import Star from './Star';

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

class PlaceComponent extends Component {
  cardRef = React.createRef();

  componentDidMount = () => {
    const { createCardRef, barID } = this.props;
    createCardRef(barID, this.cardRef.current);
  }

  // make label about how many people are on the list of the specific bar
  // if current user also in the list - subtract from  the number
  // and add label 'and me' or just 'me'
  // if only current user in the list
  getVisitorsCount = () => {
    const { isUserGoing, visitorsCount } = this.props;
    return isUserGoing
      ? visitorsCount - 1
      : visitorsCount;
  };

  add = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { addToVisitorsList, barID } = this.props;
    addToVisitorsList(barID);
  };

  remove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { removeFromVisitorsList, barID } = this.props;
    removeFromVisitorsList(barID);
  };

  show = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { showList, barID } = this.props;
    showList(barID);
  };

  loginAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { loginAndAdd, barID } = this.props;
    loginAndAdd(barID);
  };

  cardClick = () => {
    const source = 'notmap';
    const { markerClick, barID } = this.props;
    markerClick(barID, source);
  };

  GoingLabel = () => {
    const { isUserGoing, classes } = this.props;
    const visitorsCount = this.getVisitorsCount();
    const userOnTheListLabel = visitorsCount <= 0
      ? (
        <span className={classes.me}>
          me
        </span>
      )
      : (
        <React.Fragment>
          {`${visitorsCount} `}
          <span className={classes.me}>
            and me
          </span>
        </React.Fragment>
      );
    const userNotOnTheListLabel = visitorsCount === 0 ? '-' : visitorsCount;

    return isUserGoing
      ? userOnTheListLabel
      : (
        <span>
          {userNotOnTheListLabel}
        </span>
      );
  };

  renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < Math.floor(num); i++) {
      stars.push(<Star
        key={uuidv1()}
        width="20"
        color="#ffd10e"
        percent="1"
      />);
    }
    const percent = num % 1;
    stars.push(<Star
      key={uuidv1()}
      width="20"
      color="#ffd10e"
      percent={percent}
    />);
    return stars;
  };

  render() {
    const {
      isHighlighted, photo, name, address, rating, authenticated, isUserGoing, classes,
    } = this.props;
    return (
      <div
        className={`${classes.placeCard} ${classes.text}`}
        ref={this.cardRef}
        onClick={this.cardClick}
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
              {this.renderStars(rating)}
            </div>
          )
        }
        <div>
          {'Going: '}
          <this.GoingLabel />
        </div>
        {authenticated
          ? (
            <React.Fragment>
              {isUserGoing
                ? (
                  <div className={classes.button}>
                    <Button raised color="accent" dense onClick={this.remove}>
                      Remove
                    </Button>
                  </div>
                )
                : (
                  <div className={classes.button}>
                    <Button raised color="accent" dense onClick={this.add}>
                      Add
                    </Button>
                  </div>
                )
              }
              { this.getVisitorsCount() > 0
                && (
                  <div className={classes.button}>
                    <Button raised color="accent" dense onClick={this.show}>
                      List
                    </Button>
                  </div>
                )
              }
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <Button raised color="accent" dense onClick={this.loginAdd}>
                  Add
              </Button>
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

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
  visitorsCount: PropTypes.number.isRequired,
  barID: PropTypes.string.isRequired,
  addToVisitorsList: PropTypes.func.isRequired,
  removeFromVisitorsList: PropTypes.func.isRequired,
  showList: PropTypes.func.isRequired,
  loginAndAdd: PropTypes.func.isRequired,
  markerClick: PropTypes.func.isRequired,
  createCardRef: PropTypes.func.isRequired,
};
