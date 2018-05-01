import Places from "../components/Places"
import { connect } from 'react-redux';
import { 
	findLocation, 
	showPlaces, 
	setHeight, 
	highlightPlace, 
	replaceLocation 
} from '../../actions';

const mapStateToProps = ({reducer}) =>(
	{ 
		bars: reducer.user.locationBars, 
		lat: reducer.user.lat, 
		lng: reducer.user.lng,
		footerHeight: reducer.user.footerHeight 
	}
);

export default connect(mapStateToProps, { findLocation, showPlaces, setHeight, highlightPlace, replaceLocation })(Places);