import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  text: theme.typography.button,
})

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { address: props.placeLocation }
    this.onChange = (address) => this.setState({ address });
  }
    
  componentWillReceiveProps(nextProps) {
    if (this.props.placeLocation != nextProps.placeLocation) {
      this.setState({ address: nextProps.placeLocation });
    }
  }

  handleSelect = (address, placeId) => {
    this.setState({ address });
    if (this.props.urlLocation.pathname === '/location' || this.props.urlLocation.pathname === '/places') {
      //set url to show selected location on map
      this.props.setLocation(address, this.props.urlLocation.pathname);
    }
  }
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    //set url to show bars on map
    this.props.setPlacesLocation(this.state.address);
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const myStyles = {
      autocompleteContainer: { zIndex: 1000 },
    }
    return (
      <React.Fragment>
        <div className={this.props.classes.text} style={{margin:5}}>
          Enter location:
        </div>
        <PlacesAutocomplete inputProps={inputProps} styles={myStyles} onSelect={this.handleSelect} />
        <div style={{marginTop:5}}>
          <Button raised color="primary" dense={true} onClick={this.handleFormSubmit}>
            Show bars
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
 
export default withStyles(styles)(SearchForm);