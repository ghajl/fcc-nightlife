import { connect } from 'react-redux';
import Places from '../components/Places';
import {
  findLocation,
  showBars,
} from '../actions/location';
import {
  showVisitorsList,
  highlightPlace,
} from '../actions/bar';
import { replaceLocation } from '../actions/url';

const mapStateToProps = ({ reducer }) => (
  {
    bars: reducer.location.bars,
    lat: reducer.location.lat,
    lng: reducer.location.lng,
  }
);

export default connect(mapStateToProps, {
  findLocation, showBars, showVisitorsList, highlightPlace, replaceLocation,
})(Places);
