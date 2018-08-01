import { connect } from 'react-redux';
import Home from '../components/Home';
import { findLocation, replaceLocation } from '../../actions';

export default connect(() => ({}), { findLocation, replaceLocation })(Home);
