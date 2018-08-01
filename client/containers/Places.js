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
    bars: reducer.user.locationBars,
    lat: reducer.user.lat,
    lng: reducer.user.lng,
  }
);

export default connect(mapStateToProps, {
  findLocation, showPlaces, showList, highlightPlace, replaceLocation,
})(Places);
