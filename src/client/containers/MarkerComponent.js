import MarkerComponent from "../components/MarkerComponent"
import { connect } from 'react-redux';

const isHighlighted = (placeID, highlightedID) => {
	return placeID == highlightedID;
}

const mapStateToProps = (reducer, {placeID}) =>(
	{
		isHighlighted: isHighlighted(placeID, reducer.user.highlighted)
	}
);


export default connect(mapStateToProps)(MarkerComponent);