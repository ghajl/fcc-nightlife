import React, { PureComponent } from 'react';
import { Marker } from 'react-google-maps';
import PropTypes from 'prop-types';
import { RED_MARKER, BLUE_MARKER } from '../util/icons';

class MapMarker extends PureComponent {
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

  markerClick = () => {
    const {
      barId, markerClick,
    } = this.props;
    markerClick(barId);
  }

  render() {
    const {
      isHighlighted, lat, lng,
    } = this.props;
    const { animation } = this.state;
    const markerIcon = isHighlighted ? RED_MARKER : BLUE_MARKER;
    return (
      <Marker
        position={{ lat, lng }}
        onClick={this.markerClick}
        icon={markerIcon}
        animation={animation}
      />
    );
  }
}

export default MapMarker;

MapMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  barId: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  markerClick: PropTypes.func.isRequired,
};
