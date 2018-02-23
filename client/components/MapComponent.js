import React from 'react';
import { compose, withProps } from "recompose";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerComponent from '../containers/MarkerComponent';


const MapComponent = compose(
    withProps({
        loadingElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%`, opacity: '.8' }} />
    }),
    withGoogleMap
)((props) => {
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: +props.lat, lng:  +props.lng }}
            center={{ lat: +props.lat, lng:  +props.lng }}
            ref={props.mapRef}
        >
            {props.markers ? props.markers.map((marker, index) => {
                //check because redux-persist
                let lat = isNaN(marker.location.lat) ?  marker.location.lat() : marker.location.lat;
                let lng = isNaN(marker.location.lng) ?  marker.location.lng() : marker.location.lng;
                let placeID = marker.id;
                return (
                    <MarkerComponent key={index} lat={lat} lng={lng} placeID={placeID} markerClick={() => props.markerClick(placeID)} />
                    
                  )}
                ) : (
               <Marker position={{ lat: +props.lat, lng: +props.lng }} />
            )}
            
               
        </GoogleMap>
        )
    }
)

export default MapComponent;

