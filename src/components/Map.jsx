import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';
import MapMarker from '../containers/MapMarker';

class Map extends Component {
  shouldComponentUpdate(nextProps) {
    const { lat, lng, markers } = this.props;
    return (lat !== nextProps.lat || lng !== nextProps.lng || markers !== nextProps.markers);
  }

  setMap = (el) => {
    const { setMap } = this.props;
    setMap(el);
  }

  render() {
    const {
      lat, lng, markers, markerClick,
    } = this.props;
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: +lat, lng: +lng }}
        center={{ lat: +lat, lng: +lng }}
        ref={this.setMap}
        defaultOptions={{
          styles: [
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#1d2c4d',
                },
              ],
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#8ec3b9',
                },
              ],
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#1a3646',
                },
              ],
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#4b6878',
                },
              ],
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#64779e',
                },
              ],
            },
            {
              featureType: 'administrative.province',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#4b6878',
                },
              ],
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#334e87',
                },
              ],
            },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#023e58',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#283d6a',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#6f9ba5',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#1d2c4d',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#023e58',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#3C7680',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#304a7d',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#98a5be',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#1d2c4d',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#2c6675',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#255763',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#b0d5ce',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#023e58',
                },
              ],
            },
            {
              featureType: 'transit',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#98a5be',
                },
              ],
            },
            {
              featureType: 'transit',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#1d2c4d',
                },
              ],
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#283d6a',
                },
              ],
            },
            {
              featureType: 'transit.station',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#3a4762',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#0e1626',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#4e6d70',
                },
              ],
            },
          ],
        }}
      >
        {markers
          ? markers.map((marker) => {
            // check because redux-persist
            const markerLat = typeof marker.location.lat === 'number'
              ? marker.location.lat : marker.location.lat();
            const markerLng = typeof marker.location.lng === 'number'
              ? marker.location.lng : marker.location.lng();
            const barId = marker.id;
            return (
              <MapMarker
                key={barId}
                lat={markerLat}
                lng={markerLng}
                barId={barId}
                markerClick={markerClick}
              />
            );
          })
          : (
            <Marker position={{ lat: +lat, lng: +lng }} />
          )
        }
      </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  setMap: PropTypes.func.isRequired,
  markerClick: PropTypes.func.isRequired,
};

Map.defaultProps = {
  markers: null,
};
