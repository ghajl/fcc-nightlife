import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { address: props.location }
    this.onChange = (address) => this.setState({ address });
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
 handleSelect(address, placeId){
  this.setState({ address });
  this.props.findPlace(address);
  // this.setState({ address, placeId })

  // You can do other things with address string or placeId. For example, geocode :)
}
  handleFormSubmit(event) {
    event.preventDefault()
 
    // geocodeByAddress(this.state.address)
    //   .then(results => getLatLng(results[0]))
    //   .then(latLng => console.log('Success', latLng))
    //   .catch(error => console.error('Error', error));
    //   console.log(this.props)
    this.props.submitSearch(this.state.address)
    //   const service = new google.maps.places.PlacesService(this.props.map);
    //   console.log(service)
    // this.props.showPlaces( this.state.address);
  }
 
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
 
    return (
      
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect}/>
        <button type="submit">Submit</button>
      </form>
      
    )
  }
}
 
export default SearchForm;