import React from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerComponent from '../containers/MarkerComponent';

const MapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%', opacity: '.8' }} />,
  }),
  withGoogleMap,
)(({
  lat, lng, mapRef, markers, markerClick,
}) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: +lat, lng: +lng }}
    center={{ lat: +lat, lng: +lng }}
    ref={mapRef}
  >
    {markers
      ? markers.map((marker) => {
        // check because redux-persist
        const markerLat = typeof marker.location.lat === 'number'
          ? marker.location.lat : marker.location.lat();
        const markerLng = typeof marker.location.lng === 'number'
          ? marker.location.lng : marker.location.lng();
        const placeID = marker.id;
        return (
          <MarkerComponent
            key={placeID}
            lat={markerLat}
            lng={markerLng}
            placeID={placeID}
            markerClick={() => markerClick(placeID)}
          />
        );
      })
      : (
        <Marker position={{ lat: +lat, lng: +lng }} />
      )
    }
  </GoogleMap>
));

export default MapComponent;
