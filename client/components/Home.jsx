import React, { Component } from 'react';
import injectSheet from 'react-jss';
import qs from 'query-string';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Page from './Page';
import HomeMap from '../containers/HomeMap';
import SearchBar from '../containers/SearchBar';
import { defaultLocation } from '../../util/locations';

const styles = {
  searchBar: {
    width: '400px',
    maxWidth: '80%',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: '.9',
    top: '170px',
    left: '50%',
    boxShadow: '5px 1px 10px #888888',
    transform: 'translate(-50%, -50%)',
  },
  map: {
    marginTop: '60px',
    '@media (max-width: 600px)': {
      marginTop: '50px',
    },
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.location = qs.parse(props.location.search);
    // set location from url
    if (!this.location.loc) {
      props.replaceLocation(defaultLocation.address, props.location.pathname);
    } else {
      props.findLocation(this.location.loc);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location, replaceLocation, findLocation } = this.props;
    if (location.search !== nextProps.location.search) {
      this.location = qs.parse(nextProps.location.search);
      // set location from url
      if (!this.location.loc) {
        replaceLocation(defaultLocation.address, location.pathname);
      } else {
        findLocation(this.location.loc);
      }
    }
  }

  render() {
    const { location, classes, match } = this.props;
    return (
      <Page location={location}>
        <React.Fragment>
          <div className={classes.map} id="content">
            <HomeMap
              isMarkerShown
              containerElement={<div style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }} />}
            />
          </div>
          <SearchBar
            urlLocation={location}
            path={match.path}
            placeLocation={this.location.loc}
            className={classes.searchBar}
          />
        </React.Fragment>
      </Page>
    );
  }
}

export default compose(injectSheet(styles), withWidth())(Home);

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  replaceLocation: PropTypes.func.isRequired,
  findLocation: PropTypes.func.isRequired,
};
