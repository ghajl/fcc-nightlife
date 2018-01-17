import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    
  }),
  withGoogleMap
)((props) => {
  console.log(props);
  return (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: +props.lat, lng:  +props.lng }}
    center={{ lat: +props.lat, lng:  +props.lng }}
    
  >
    {props.isMarkerShown && <Marker position={{ lat: +props.lat, lng: +props.lng }} />}
  </GoogleMap>
  )
}
)

export default MapComponent;