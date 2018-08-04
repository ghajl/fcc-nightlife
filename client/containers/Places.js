import { connect } from 'react-redux';
import Places from '../components/Places';
import {
  findLocation,
  showPlaces,
  showVisitorsList,
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
  findLocation, showPlaces, showVisitorsList, highlightPlace, replaceLocation,
})(Places);
