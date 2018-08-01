import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  text: theme.typography.button,
  searchBar: {
    width: '100%',
    height: '120px',
    backgroundColor: '#FFD54F',
    position: 'relative',
  },
  form: {
    width: '80%',
    padding: '10px',
  },

});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    const { placeLocation } = props;
    this.state = { address: placeLocation };
    this.onChange = address => this.setState({ address });
  }

  componentWillReceiveProps(nextProps) {
    const { placeLocation } = this.props;
    if (placeLocation !== nextProps.placeLocation) {
      this.setState({ address: nextProps.placeLocation });
    }
  }

  handleSelect = (address) => {
    this.setState({ address });
    const { urlLocation, setLocation } = this.props;
    if (urlLocation.pathname === '/location' || urlLocation.pathname === '/places') {
      // set url to show selected location on map
      setLocation(address, urlLocation.pathname);
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { setPlacesLocation } = this.props;
    const { address } = this.state;
    // set url to show bars on map
    setPlacesLocation(address);
  }

  render() {
    const {
      classes, style, className, searchBarRef,
    } = this.props;
    const { address } = this.state;
    const inputProps = {
      value: address,
      onChange: this.onChange,
    };
    const myStyles = {
      autocompleteContainer: { zIndex: 1000 },
    };
    return (
      <div className={`${classes.searchBar} ${className}`} style={{ ...style }} ref={searchBarRef}>
        <div className={classes.form}>
          <div className={classes.text} style={{ margin: 5 }}>
            Enter location:
          </div>
          <PlacesAutocomplete
            inputProps={inputProps}
            styles={myStyles}
            onSelect={this.handleSelect}
          />
          <div style={{ marginTop: 5 }}>
            <Button raised color="primary" dense onClick={this.handleFormSubmit}>
              Show bars
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  searchBarRef: PropTypes.shape({}),
  placeLocation: PropTypes.string.isRequired,
  urlLocation: PropTypes.shape({}).isRequired,
  setLocation: PropTypes.func.isRequired,
  setPlacesLocation: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
};

SearchBar.defaultProps = {
  className: '',
  classes: {},
  style: {},
  searchBarRef: null,
};
