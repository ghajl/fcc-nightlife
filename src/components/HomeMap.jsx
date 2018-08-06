import React from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const HomeMap = compose(
  withProps({
    loadingElement: <div style={{ flex: '1 0 auto', display: 'flex', 'flex-direction': 'column' }} />,
    mapElement: <div style={{ flex: '1 0 auto', opacity: '.8' }} />,
  }),
  withGoogleMap,
)(({ lat, lng }) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: +lat, lng: +lng }}
    center={{ lat: +lat, lng: +lng }}
  >
    <Marker position={{ lat: +lat, lng: +lng }} />
  </GoogleMap>
));

export default HomeMap;
