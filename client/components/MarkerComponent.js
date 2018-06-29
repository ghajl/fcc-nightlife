import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {RED_MARKER, BLUE_MARKER} from '../../util/icons';

class MarkerComponent extends Component {
  constructor() {
    super();
    this.state = {
      animation: null 
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isHighlighted && !this.props.isHighlighted) {
      this.setState({ animation: google.maps.Animation.BOUNCE }, () => {
          setTimeout(() => this.setState({
            animation: null
          }), 1000);
        }
      )
    }
  }
  
  render() {
    const markerIcon = this.props.isHighlighted ? RED_MARKER : BLUE_MARKER;
    return (
      <Marker 
        position={{ lat: this.props.lat, lng: this.props.lng }} 
        onClick={this.props.markerClick}
        icon={markerIcon}
        animation ={ this.state.animation }
      />
    )
  }
}

export default MarkerComponent;