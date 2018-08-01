import { connect } from 'react-redux';
import MarkerComponent from '../components/MarkerComponent';

const isHighlighted = (placeID, highlightedID) => placeID === highlightedID;

const mapStateToProps = ({ reducer }, { placeID }) => (
  {
    isHighlighted: isHighlighted(placeID, reducer.user.highlighted),
  }
);

export default connect(mapStateToProps)(MarkerComponent);
