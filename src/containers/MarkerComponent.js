import { connect } from 'react-redux';
import MarkerComponent from '../components/MarkerComponent';

const isHighlighted = (barID, highlightedID) => barID === highlightedID;

const mapStateToProps = ({ reducer }, { barID }) => (
  {
    isHighlighted: isHighlighted(barID, reducer.bar.highlighted),
  }
);

export default connect(mapStateToProps)(MarkerComponent);
