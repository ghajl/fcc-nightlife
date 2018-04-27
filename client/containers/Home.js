import Home from "../components/Home"
import { connect } from 'react-redux';
import { findLocation, replaceLocation } from '../../actions';

export default connect(() => ({}), { findLocation, replaceLocation })(Home);