import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const HomeMap = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: window.innerHeight - 60 }} />,
    mapElement: <div style={{ height: `100%`, opacity: '.8' }} />,
  }),
  withGoogleMap
)((props) => {
  
  console.log(props);
  return (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: +props.lat, lng:  +props.lng }}
    center={{ lat: +props.lat, lng:  +props.lng }}
    ref={props.mapRef}
  >
    <Marker position={{ lat: +props.lat, lng: +props.lng }} />
    
  </GoogleMap>
  )
}
)

export default HomeMap;