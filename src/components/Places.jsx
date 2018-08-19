import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import injectSheet from 'react-jss';
import { animateScroll as scroll } from 'react-scroll';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import uuidv1 from 'uuid/v1';
import Map from '../containers/Map';
import CardWrapper from '../containers/CardWrapper';
import Splitter from './Splitter';
import SearchBar from '../containers/SearchBar';
import { defaultLocation } from '../util/locations';
import Page from './Page';
import styleVariables from '../helpers/styleVariables';
import Star from './Star';

const styles = {
  wrapper: {
    flex: '1 0 auto',
    display: 'flex',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
    },
    marginTop: '60px',
    '@media (max-width: 600px)': {
      marginTop: '50px',
    },
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    backgroundColor: '#193150',
    '@media (min-width: 641px)': {
      maxWidth: '400px',
      width: '50%',
      'overflow-y': 'scroll',
    },
    '@media (max-width: 640px)': {
      flex: '1 0 auto',
    },
  },
  item: {
    margin: '20px',
  },
  map: {
    flexGrow: 1,
    '@media (max-width: 640px)': {
      width: 0,
      height: 0,
    },
  },
  upButtonWrapper: {
    bottom: '10%',
    right: '10%',
    zIndex: 1000,
    opacity: 0.7,
    transition: '.6s',
    position: 'relative',
    width: 0,
    height: 0,
    '@media (min-width: 641px)': {
      width: '52px',
      height: '52px',
      position: 'absolute',
    },
  },
  upButton: {
    width: '50px',
    height: '50px',
    position: 'fixed',
    borderRadius: '50%',
    backgroundColor: 'black',
    cursor: 'pointer',
    boxShadow: '1px 1px 6px rgba(0, 0, 0, .5)',
    '@media (max-width: 640px)': {
      bottom: '10%',
      right: '10%',
    },
  },
  icon: {
    fill: 'white',
    width: '36px',
    height: '36px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Places extends Component {
  constructor(props) {
    super(props);
    const { location, replaceLocation } = props;
    this.placeLocation = qs.parse(location.search);
    // if there isn't parameter 'loc' in the url - replace url with default location
    if (!this.placeLocation.loc) {
      replaceLocation(defaultLocation.address, location.pathname);
    }
    this.barCards = {};
    this.searchBarRef = React.createRef();
    this.state = {
      upwardButtonVisible: false,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      screen: {
        height: this.getMainScreenHeight(),
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { location, showBars, replaceLocation } = this.props;
    if (location.search != null && location.search !== nextProps.location.search) {
      this.placeLocation = qs.parse(nextProps.location.search);
      // // if there is 'bar' parameter in url - show list of bars
      // // if there is only 'loc' parameter - show location on the map
      if (this.service && this.placeLocation.loc) {
        showBars(this.service, this.placeLocation.loc);
      } else {
        replaceLocation(defaultLocation.address, location.pathname);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    window.removeEventListener('scroll', this.handleScroll);
  }

  getMainScreenHeight = () => {
    if (window) {
      const header = window.innerWidth <= 600 ? 50 : 60;
      const footer = window.innerWidth <= 319
        ? styleVariables.footerHeightSm
        : styleVariables.footerHeightLg;
      return window.innerHeight - header - footer;
    }
    return 0;
  }

  setMap = (el) => {
    if (!this.map) {
      const { location, showBars } = this.props;
      this.map = el;
      this.service = new google.maps.places.PlacesService(this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
      this.placeLocation = qs.parse(location.search);
      if (this.placeLocation.bar && this.placeLocation.loc) {
        showBars(this.service, this.placeLocation.loc);
      }
    }
  }


  setScrollEvent = (element) => {
    if (element) {
      element.addEventListener('scroll', this.handleScroll);
    }
  }

  showBasket = () => {
    const { showBasket } = this.props;
    showBasket(this.service);
  }

  // show choosed bar on map and in list of bar cards
  markerClick = (barId) => {
    const { highlightPlace } = this.props;
    if (this.barCards[barId] && this.searchBarRef) {
      const position = this.barCards[barId].getBoundingClientRect().top
      - this.searchBarRef.current.getBoundingClientRect().top;
      this.scrollTo(position);
    }
    highlightPlace(barId);
  }

  createCardRef = (barId, ref) => {
    this.barCards[barId] = ref;
  }

  showList = (barId) => {
    const { showVisitorsList } = this.props;
    showVisitorsList(barId);
  }

  scrollTo = (pos) => {
    scroll.scrollTo(pos, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'ListId',
    });
  }

  scrollToTop = () => {
    const width = window.innerWidth;
    let id;
    if (width <= 640) {
      id = 'PageId';
    } else {
      id = 'ListId';
    }
    scroll.scrollToTop({ containerId: id });
  }

  handleWindowSizeChange = () => {
    this.setState({
      screen: {
        height: this.getMainScreenHeight(),
      },
    });
  }

  handleScroll = () => {
    if (this.searchBarRef) {
      const { upwardButtonVisible } = this.state;
      if (upwardButtonVisible) {
        if (this.searchBarRef.current.getBoundingClientRect().top >= -20) {
          this.setState({ upwardButtonVisible: false });
        }
      } else if (this.searchBarRef.current.getBoundingClientRect().top < -20) {
        this.setState({ upwardButtonVisible: true });
      }
    }
  }

  render() {
    const {
      classes, bars, location, match,
    } = this.props;
    const { screen, upwardButtonVisible } = this.state;
    const { height } = screen;
    const listStyle = window.innerWidth <= 640 ? {} : { height };
    const mapStyle = window.innerWidth <= 640 ? { height: 0 } : { height };
    const upButtonWrapperStyle = upwardButtonVisible
      ? { visibility: 'visible' }
      : { visibility: 'hidden', opacity: 0 };

    const mapContainer = (<div style={{ height: 'inherit', width: 'inherit' }} />);
    const mapLoadingElement = (<div style={{ height: '100%' }} />);
    const mapElement = (<div style={{ height: '100%', opacity: '.8' }} />);

    return (
      <Page showBasket={this.showBasket} location={location} id="PageId">
        <div className={classes.wrapper}>
          <div className={classes.listWrapper} style={listStyle} id="ListId" ref={this.setScrollEvent}>
            <SearchBar
              urlLocation={location}
              path={match.path}
              placeLocation={this.placeLocation.loc}
              searchBarRef={this.searchBarRef}
            />
            { bars && bars.map((item, index) => (
              <div key={item.id}>
                {index > 0 && <Splitter />}
                <CardWrapper
                  createCardRef={this.createCardRef}
                  id={item.id}
                  placeId={item.placeId}
                  photoUrl={item.photoUrl}
                  name={item.name}
                  address={item.address}
                  rating={item.rating}
                  visitorsCount={item.visitorsCount}
                />
              </div>
            ))}
            <div className={classes.upButtonWrapper} style={upButtonWrapperStyle}>
              <div
                className={classes.upButton}
                onClick={() => this.scrollToTop()}
              >
                <ArrowUpward className={classes.icon} />
              </div>
            </div>
          </div>
          <div className={classes.map} style={mapStyle}>
            <Map
              isMarkerShown
              markers={bars}
              setMap={this.setMap}
              markerClick={this.markerClick}
              containerElement={mapContainer}
              loadingElement={mapLoadingElement}
              mapElement={mapElement}
            />
          </div>
        </div>
      </Page>
    );
  }
}

export default injectSheet(styles)(Places);

Places.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.shape({}).isRequired,
  bars: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  replaceLocation: PropTypes.func.isRequired,
  showBasket: PropTypes.func.isRequired,
  showBars: PropTypes.func.isRequired,
  highlightPlace: PropTypes.func.isRequired,
  showVisitorsList: PropTypes.func.isRequired,
};

Places.defaultProps = {
  bars: null,
};
