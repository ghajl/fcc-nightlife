import React, {Component} from 'react';
import Header from '../containers/Header';
import MapComponent from '../containers/MapComponent';
import PlaceComponent from '../containers/PlaceComponent';
import injectSheet from 'react-jss';
import SearchForm from '../containers/SearchForm';
import UsersListDialog from './UsersListDialog';
import qs from 'query-string';
import {defaultLocation} from '../../util/locations';
import Grid from 'material-ui/Grid';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import Page from './Page';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ArrowUpward from 'material-ui-icons/ArrowUpward'; 

const styles = {
  root: {
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
  placesList: {
    maxWidth: '100%',
    display: 'flex', flexDirection: 'column',
    '@media (min-width: 641px)': {
      // borderRight: '.5rem solid #A8C256',
      width: '400px',
      'overflow-y': 'scroll',
    },
    '@media (max-width: 640px)': {
      width: '100%',
      flex: '1 0 auto', 
    },
    position:'relative',
  },
  carts: {
    marginTop: 0,
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
  searchBar: {
    width: '100%',
    height: '120px',
    backgroundColor: '#FFD54F',
    maxWidth: '100%',
    position: 'relative',
    top: 0,
  },
  form: {
    width: '80%',
    padding: '10px',
  },
  upButtonWrapper: {
    width: '52px',
    height: '52px',
    bottom: '10%',
    right: '10%',
    zIndex: 1000,
    opacity: .4,
    transition: '.6s',
  },
  upButton: {
    width: '50px',
    height: '50px',
    position: 'fixed',
    borderRadius: '50%',
    backgroundColor: 'black',
    cursor: 'pointer',
    boxShadow: '1px 1px 6px rgba(0, 0, 0, .5)'
  },
  icon: {
    fill: 'white',
    width: '36px',
    height: '36px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Places extends Component{
  constructor(props){
    super(props);
    this.placeLocation = qs.parse(props.location.search);
    //if there isn't parameter 'loc' in the url - replace url with default location
    if (!this.placeLocation.loc) {
      props.replaceLocation(defaultLocation.address, props.location.pathname)
    }
    this.placeCards = {};
    this.state = {
      height: window.innerHeight - this.getMargin(),
      upwardButtonVisible: false 
    };
  }

  componentWillMount(){
    window.addEventListener('resize', this.handleWindowSizeChange);
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.location.search != nextProps.location.search) {
      this.placeLocation = qs.parse(nextProps.location.search);
      //if there is 'bar' parameter in url - show list of bars
      //if there is only 'loc' parameter - show location on the map
      if (!this.placeLocation.bar && this.placeLocation.loc) {
          this.props.findLocation(this.placeLocation.loc); 
      } else if (this.placeLocation.bar && this.placeLocation.loc) {
        this.props.showPlaces(this.service, this.placeLocation.loc);
      }
    }
  }

  handleWindowSizeChange = () => {
    this.setState({
      height: window.innerHeight - this.getMargin() 
    });
  }
    
  handleScroll = () => {
    if (this.topElement) {
      if (this.topElement.getBoundingClientRect().top < -20 && !this.state.upwardButtonVisible) {
        this.setState({upwardButtonVisible: true});
      } else if (this.topElement.getBoundingClientRect().top >= -20 && this.state.upwardButtonVisible) {
        this.setState({upwardButtonVisible: false});
      }
    }
  }

  scrollToTop = (width) => {
    let id;
    if (width <= 640) {
      id = 'PageElementID';
    } else {
      id = 'PlacesListElementID';
    }
    scroll.scrollToTop({containerId: id});
  }

  scrollTo = (pos) => {
    scroll.scrollTo(pos - 150, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'PlacesListElementID',
    })
  }

  showList = placeID => {
    this.props.showList(placeID);
  }

  //show choosed bar on map and in list of bar cards
  markerClick = (placeID, source = 'map') => {
    if (source === 'map' && this.placeCards[placeID] && this.topElement) {
      const position = this.placeCards[placeID].getBoundingClientRect().top - this.topElement.getBoundingClientRect().top;
      this.scrollTo(position);
    }
    this.props.highlightPlace(placeID);
  }

  getMargin = () => {
    return this.props.width == 'xs' ? 50 : 60;
  }
 
  setMap = (el) => {
    if (!this.map) {
      this.map = el;
      this.service = new google.maps.places.PlacesService(this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
      this.placeLocation = qs.parse(this.props.location.search);
      if (this.placeLocation.bar && this.placeLocation.loc) {
        this.props.showPlaces(this.service, this.placeLocation.loc);
      }
    }
  }

  setPlacesListEvent = element => {
    if (element) {
      element.addEventListener('scroll', this.handleScroll);
    }
  }

  render() {
    const { classes, bars, location} = this.props;
    const {height, upwardButtonVisible} = this.state;
    const sectionStyle = window.innerWidth <= 640 ? {} : { height: height - this.props.footerHeight};
    let upButtonWrapperStyle = window.innerWidth <= 640 ? {position: 'relative', width: 0, height: 0} : {position: 'absolute'};
    upButtonWrapperStyle = upwardButtonVisible 
      ? {...upButtonWrapperStyle, ...{visibility: 'visible'}} 
      : {...upButtonWrapperStyle, ...{visibility: 'hidden', opacity: 0,}};
    const upButtonStyle = window.innerWidth <= 640 ? {bottom: '10%', right: '10%',} : {};
    const listStyle = window.innerWidth <= 640 ? { flex: '1 0 auto' } : { height: height - 120 - this.props.footerHeight};
    const mapStyle = window.innerWidth <= 640 ? { height: 0 } : { height: height - this.props.footerHeight};
    return (
      <Page location={location} id='PageElementID'>
        <div className={classes.root}>
          <div className={classes.placesList} style={sectionStyle} id='PlacesListElementID' ref={el => this.setPlacesListEvent(el)}>
            <div className={classes.searchBar} ref={el => this.topElement = el}>
              <div className={classes.form}>
                <SearchForm urlLocation={location} path={this.props.match.path} placeLocation={this.placeLocation.loc}/>
              </div>
            </div>
            <div className={classes.carts} style={listStyle}>
              { bars && bars.map((item, index) =>
                  <PlaceComponent 
                    key={index}
                    data={item} 
                    path={this.props.match.url}
                    showList={this.showList}
                    markerClick={this.markerClick}
                    cardRef={el => this.placeCards[item.id] = el}
                  />
                )
              }
            </div>
            <div className={classes.upButtonWrapper} style={upButtonWrapperStyle} >
              <div 
                className={classes.upButton} 
                style={upButtonStyle} 
                onClick={() => this.scrollToTop(window.innerWidth)}
              >
                <ArrowUpward className={classes.icon} />
              </div>
            </div>
          </div>
          <div className={classes.map} style={mapStyle}>
            <MapComponent 
              isMarkerShown
              markers={bars}
              mapRef={el => this.setMap(el)}
              markerClick={this.markerClick}
              containerElement={<div style={{ height: 'inherit', width: 'inherit' }} />}
            />
          </div>
        </div>
      </Page>
    )
  }
}

export default compose(injectSheet(styles), withWidth())(Places);