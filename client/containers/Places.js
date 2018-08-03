import { connect } from 'react-redux';
import Places from '../components/Places';
import {
  findLocation,
  showPlaces,
  showList,
  highlightPlace,
  replaceLocation,
} from '../../actions';

const mapStateToProps = ({ reducer }) => (
  {
    bars: reducer.location.locationBars,
    lat: reducer.location.lat,
    lng: reducer.location.lng,
  }
);

export default connect(mapStateToProps, {
  findLocation, showPlaces, showList, highlightPlace, replaceLocation,
})(Places);
