import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {RED_MARKER, BLUE_MARKER} from '../../util/icons';



const MarkerComponent = (props) => {
	const markerIcon = props.isHighlighted ? RED_MARKER : BLUE_MARKER;
	return (
		<Marker 
			position={{ lat: props.lat, lng: props.lng }} 
			onClick={props.markerClick}
			icon={markerIcon}
			/>
	)
}

export default MarkerComponent;