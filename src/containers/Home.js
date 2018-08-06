import { connect } from 'react-redux';
import Home from '../components/Home';
import { findLocation } from '../actions/location';
import { replaceLocation } from '../actions/url';

export default connect(() => ({}), { findLocation, replaceLocation })(Home);
