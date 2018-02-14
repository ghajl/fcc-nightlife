import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const HomeMap = compose(
    withProps({
        loadingElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%`, opacity: '.8' }} />,
    }),
    withGoogleMap
)((props) => {
  
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: +props.lat, lng:  +props.lng }}
            center={{ lat: +props.lat, lng:  +props.lng }}
            >
            <Marker position={{ lat: +props.lat, lng: +props.lng }} />
          
        </GoogleMap>
        )
    }
)

export default HomeMap;