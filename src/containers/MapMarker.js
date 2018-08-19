import { connect } from 'react-redux';
import MapMarker from '../components/MapMarker';

const isHighlighted = (barId, highlightedId) => barId === highlightedId;

const mapStateToProps = ({ reducer }, { barId }) => (
  {
    isHighlighted: isHighlighted(barId, reducer.bar.highlighted),
  }
);

export default connect(mapStateToProps)(MapMarker);
