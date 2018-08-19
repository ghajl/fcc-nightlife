import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import { withStyles } from 'material-ui/styles';
import Search from 'material-ui-icons/Search';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  text: theme.typography.button,
  searchBar: {
    width: '100%',
    height: '90px',
    minHeight: '90px',
    backgroundColor: '#FFD54F',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '& input[type="text"]': {
      border: 'none',
      fontFamily: 'Alegreya Sans, sans-serif',
    },
  },
  form: {
    width: '80%',
    padding: '16px',
  },
  icon: {
    fontSize: 36,
    width: 36,
    height: 36,
  },
  autocomplete: {

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
    const { setPlacesLocation } = this.props;
    setPlacesLocation(address);
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
      autocompleteContainer: {
        zIndex: 1000,
        fontFamily: 'Alegreya Sans, sans-serif',
      },
    };
    return (
      <div className={`${classes.searchBar} ${className}`} style={{ ...style }} ref={searchBarRef}>
        <div className={classes.form}>
          <PlacesAutocomplete
            inputProps={inputProps}
            styles={myStyles}
            onSelect={this.handleSelect}
            className={classes.autocomplete}
          />
        </div>
        <IconButton className={classes.button} aria-label="Show bars" title="Show bars" onClick={this.handleFormSubmit}>
          <Search className={classes.icon} />
        </IconButton>
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
  setPlacesLocation: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
};

SearchBar.defaultProps = {
  className: '',
  classes: {},
  style: {},
  searchBarRef: null,
};
