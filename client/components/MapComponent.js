import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: window.innerHeight - 60, width: '100%' }} />,
    mapElement: <div style={{ height: window.innerHeight - 60, opacity: '.8' }} />
  }),
  withGoogleMap
)((props) => {
  console.log(props);
  return (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: +props.lat, lng:  +props.lng }}
    center={{ lat: +props.lat, lng:  +props.lng }}
    options={{ scrollwheel: false}}
  >
    {props.markers.map((marker, index) => {
      let lat = isNaN(marker.lat) ?  marker.lat() : marker.lat;
      let lng = isNaN(marker.lng) ?  marker.lng() : marker.lng;
      return (
          <Marker key={index} position={{ lat: lat, lng: lng }} />
        )
    }
      
    )}
  </GoogleMap>
  )
}
)

export default MapComponent;