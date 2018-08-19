import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui-icons/Done';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import Group from 'material-ui-icons/Group';
import Place from 'material-ui-icons/Place';
import uuidv1 from 'uuid/v1';
import Star from './Star';
import Card from './Card';
import CardContent from './CardContent';
import CardImage from './CardImage';
import CardActions from './CardActions';

const styles = {
  wrapper: {
    display: 'inline-block',
    width: '100%',
  },
  name: {
    fontSize: '2.4rem',
    lineHeight: '1',
    marginBottom: '.2rem',
    color: '#7FC4F3',
  },
  address: {
    fontSize: '1.2rem',
  },
  rating: {
  },
  action: {
    textAlign: 'center',
  },
  goingWrapper: {
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
  },
  going: {
    display: 'inline-block',
    lineHeight: '1',
  },
  imageWrapper: {
    maxHeight: '200px',
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0 3rem 0',
  },
  centerVertical: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  icon: {
    color: 'white',
    fontSize: 36,
    width: 36,
    height: 36,
  },
  remove: {
    color: '#FF3535',
  },
  add: {
    color: '#93DB18',
  },
  button: {
  },
  mapVisible: {
    display: 'none',
    '@media (min-width: 641px)': {
      display: 'block',
    },
  },
};

class CardWrapper extends PureComponent {
  cardRef = React.createRef();

  componentDidMount = () => {
    const { createCardRef, id } = this.props;
    createCardRef(id, this.cardRef.current);
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
    const { addBar, id } = this.props;
    addBar(id);
  };

  show = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { showVisitorsList, id } = this.props;
    showVisitorsList(id);
  };

  loginAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { loginAndAdd, id } = this.props;
    loginAndAdd(id);
  };

  highlightMarker = () => {
    const { highlightPlace, id } = this.props;
    highlightPlace(id);
  }


  renderGoing = () => {
    const { isUserGoing, classes } = this.props;
    const visitorsCount = this.getVisitorsCount();
    const currentOnTheList = visitorsCount <= 0
      ? (
        <span className={classes.visitorsCountWrapper}>
          <span className={classes.you}>
            You
          </span>
        </span>
      )
      : (
        <span className={classes.visitorsCountWrapper}>
          <span className={classes.you}>
            You and
          </span>
          <span className={classes.visitorsCount}>
            {` ${visitorsCount}`}
          </span>
        </span>
      );
    const currentNotOnTheList = (
      <span className={classes.visitorsCount}>
        {visitorsCount === 0
          ? '-'
          : visitorsCount
        }
      </span>
    );

    return (
      <div className={classes.goingWrapper}>
        <span className={classes.going}>
          {'Going: '}
          {isUserGoing
            ? currentOnTheList
            : currentNotOnTheList
          }
        </span>
      </div>
    );
  };


  renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < Math.floor(num); i++) {
      const key = uuidv1();
      stars.push(<Star
        key={key}
        width="20"
        color="#ffd10e"
        percent="1"
      />);
    }
    const percent = num % 1;
    if (percent > 0) {
      const key = uuidv1();
      stars.push(<Star
        key={key}
        width="20"
        color="#ffd10e"
        percent={percent}
      />);
    }
    return stars;
  };

  render() {
    const {
      classes,
      id,
      photoUrl,
      name,
      address,
      rating,
      authenticated,
      isUserGoing,
    } = this.props;
    const visitorsCount = this.getVisitorsCount();
    const shouldShowList = authenticated
      && ((isUserGoing && visitorsCount > 1) || (visitorsCount > 0));
    return (
      <div ref={this.cardRef} className={classes.wrapper}>
        <Card
          id={id}
        >
          <CardContent>
            {photoUrl && (
              <div className={classes.imageWrapper}>
                <CardImage src={photoUrl} />
              </div>
            )
            }
            <div>
              <span className={classes.name}>
                {name}
              </span>
            </div>
            <span className={classes.address}>
              {address}
            </span>
            {rating
              && (
                <div className={classes.rating}>
                  {this.renderStars(rating)}
                </div>
              )
            }
            {this.renderGoing()}
            <CardActions>
              {isUserGoing
                ? (
                  <Done className={`${classes.icon} ${classes.add}`} />
                )
                : (
                  <IconButton className={classes.button} aria-label="Add to list" title="Add to list" onClick={authenticated ? this.add : this.loginAdd}>
                    <AddCircleOutline className={`${classes.icon} ${classes.add}`} />
                  </IconButton>
                )
              }
              {shouldShowList
                && (
                  <IconButton className={classes.button} aria-label="Show list" title="Show list" onClick={this.show}>
                    <Group className={classes.icon} />
                  </IconButton>
                )
              }
              <IconButton className={`${classes.button} ${classes.mapVisible}`} aria-label="Show on map" title="Show on map" onClick={this.highlightMarker}>
                <Place className={classes.icon} />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(CardWrapper);

CardWrapper.propTypes = {
  classes: PropTypes.shape({}),
  showVisitorsList: PropTypes.func.isRequired,
  createCardRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number,
  isUserGoing: PropTypes.bool.isRequired,
  visitorsCount: PropTypes.number.isRequired,
  highlightPlace: PropTypes.func.isRequired,
  addBar: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loginAndAdd: PropTypes.func.isRequired,
};

CardWrapper.defaultProps = {
  classes: {},
  photoUrl: null,
  rating: 0,
};
