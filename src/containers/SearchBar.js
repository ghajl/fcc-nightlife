import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { setLocation, setPlacesLocation } from '../actions/url';

export default connect(() => ({}), { setLocation, setPlacesLocation })(SearchBar);
