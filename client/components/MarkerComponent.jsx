import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import PropTypes from 'prop-types';
import { RED_MARKER, BLUE_MARKER } from '../../util/icons';

class MarkerComponent extends Component {
  state = {
    animation: null,
  };

  componentWillReceiveProps(nextProps) {
    const { isHighlighted } = this.props;
    if (nextProps.isHighlighted && !isHighlighted) {
      this.setState({ animation: google.maps.Animation.BOUNCE }, () => {
        setTimeout(() => this.setState({
          animation: null,
        }), 1000);
      });
    }
  }

  render() {
    const {
      isHighlighted, lat, lng, markerClick,
    } = this.props;
    const { animation } = this.state;
    const markerIcon = isHighlighted ? RED_MARKER : BLUE_MARKER;
    return (
      <Marker
        position={{ lat, lng }}
        onClick={markerClick}
        icon={markerIcon}
        animation={animation}
      />
    );
  }
}

export default MarkerComponent;

MarkerComponent.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  markerClick: PropTypes.func.isRequired,
};
