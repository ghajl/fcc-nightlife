import Home from "../components/Home"
import { connect } from 'react-redux';
import { findLocation, showPlaces, replaceLocation } from '../../actions';

export default connect(() => ({}), { findLocation, showPlaces, replaceLocation })(Home);